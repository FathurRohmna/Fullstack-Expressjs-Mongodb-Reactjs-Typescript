import { LoginDto } from './dto/logIn.dto';
import { UserDocument } from './../user/user.model';
import { TokenPayload } from './../common/interfaces/tokenPayload.interface';
import { CreateUserDto } from './../user/dto/create-user.dto';
import { TokenData } from './../common/interfaces/tokenData.interface';
import { UserWithThatEmailDoestExistsException } from './../common/exceptions/UserWithThatEmailDoestExistsException';
import UserService from './../user/user.service';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import argon2 from 'argon2';
import * as dotenv from 'dotenv'

dotenv.config()

export class AuthService {
  constructor(private readonly userService: UserService = new UserService) {}

  public async validate(data: LoginDto) {
    const user = await this.userService.getUserByEmail(data.email);

    if (!user) {
      throw new UserWithThatEmailDoestExistsException(data.email);
    }

    if (!(await argon2.verify(user.password, data.password))) {
      throw new Error('Hello')
    }

    return user;
  }

  public login(user: UserDocument) {
    const expiresIn = 60 * 60 * 24 * 7
    const secret = process.env.JWT_SECRET

    const payload: TokenPayload = { userId: user._id, permissionFlags: user.permissionFlags }
    const refreshId = user._id + secret
    const salt = crypto.createSecretKey(crypto.randomBytes(16))
    const hash = crypto.createHmac('sha512', salt).update(refreshId).digest('base64')

    payload.refreshKey = salt.export()

    const token = jwt.sign(payload, secret, { expiresIn })

    return {
      token: token,
      refreshToken: hash,
      expiresIn: expiresIn
    }
  }
}
