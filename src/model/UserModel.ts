import { IUser } from "./interface/IUser";
import { userSchema } from "./schema/UserSchema";
import { mongoose } from "../service/mongose";

const UserModel = mongoose.model<IUser>('User', userSchema);

export {
    UserModel
}