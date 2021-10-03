import mongoose, { Document, Schema, HookNextFunction } from 'mongoose';
import argon2 from 'argon2';
import shortid from 'shortid';

export interface UserDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  permissionFlags: number;
  avatar: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema(
  {
    _id: { type: String, default: shortid.generate },
    firstName: { type: String, required: true, min: 6, max: 255 },
    lastName: { type: String, required: false, min: 6, max: 255 },
    email: { type: String, required: true, unique: true, min: 6, max: 255 },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
    permissionFlags: Number,
    avatar: { type: String, default: "https://res.cloudinary.com/dfobdvbqs/image/upload/v1629729794/article-app-express-js/avatar_mmnoga.png" }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false
  },
)

UserSchema.pre('save', async function (next: HookNextFunction) {
  let user: UserDocument = this as any;

  const hash = await argon2.hash(user.password);

  user.password = hash;
  return next();
})

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const user: UserDocument = this as any;

  const userPassword = user.password;
  
  const match = await argon2.verify(userPassword, candidatePassword)

  return match
}

export const User = mongoose.model<UserDocument>('User', UserSchema);
