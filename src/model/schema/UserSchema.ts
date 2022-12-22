import { Schema } from 'mongoose';
import { IUser } from '../interface/IUser';
import mongooseUniqueValidator from 'mongoose-unique-validator';

const userSchema = new Schema<IUser>({
  userName: { type: String, required: true, unique: true },
  accountNumber: { type: Number, required: true, index: true, unique: true },
  emailAddress: { type: String, required: true, unique: true },
  identityNumber: { type: Number, required: true, index: true, unique: true },
});

userSchema.plugin(mongooseUniqueValidator)

export {
  userSchema
}