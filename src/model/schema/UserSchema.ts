import { Schema } from 'mongoose';
import { IUser } from '../interface/IUser';

const userSchema = new Schema<IUser>({
  userName: { type: String, required: true, unique: true },
  accountNumber: { type: Number, required: true, index: true, unique: true },
  emailAddress: { type: String, required: true, unique: true },
  identityNumber: { type: Number, required: true, index: true, unique: true },
});

export {
  userSchema
}