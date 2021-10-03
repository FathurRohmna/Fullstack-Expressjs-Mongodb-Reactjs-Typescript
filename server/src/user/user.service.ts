import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';

import { UserWithThatEmailAlreadyExistsException } from './../common/exceptions/UserWithThatEmailAlreadyExistsException';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './user.model';

class UserService {
  constructor(private user: Model<UserDocument> = User) {}

  public async getUserByEmail(email: string) {
    return this.user.findOne({ email: email }).exec();
  }

  public async getUserById(id: string) {
    return this.user.findOne({ _id: id }).exec();
  }

  public async usersLength() {
    return await this.user.countDocuments({})
  }

  public async createUser(userData: CreateUserDto) {
    const emailExist = await this.getUserByEmail(userData.email);

    if (emailExist) {
      throw new UserWithThatEmailAlreadyExistsException(userData.email);
    }

    const newUser = new this.user({
      ...userData,
      permissionFlags: 1
    });
    await newUser.save();

    return newUser
  }

  public async getUsers(limit = 25, page = 0) {   
    return this.user.find()
      .limit(limit)
      .select('-password')
      .skip(limit * page)
      .exec()
  }

  public async updateUser(userId: string, userFields: UpdateUserDto) {
    const existingUser = await this.user.findOneAndUpdate(
      { _id: userId },
      { $set: userFields },
      { new: false }
    ).exec()

    return existingUser
  }

  public async removeUserById(userId: string) {
    const user = await this.user.findOne({ _id: userId })

    await user.remove()

    return user
  }

  public async usersData() {
    const usersData = await this.user.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 }
        }
      }
    ])

    return usersData
  }
}

export default UserService