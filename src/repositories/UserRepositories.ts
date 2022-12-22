import { IUser } from "../model/interface/IUser";
import { UserModel } from "../model/UserModel";

export class UsersRepositories {

    async finById(id: string) {
        return await UserModel.findById(id).exec();
    }
    async finByIdentityNumber(identityNumber: number) {
        return await UserModel.findOne({ identityNumber: identityNumber }).exec();
    }
    async finByAccountNumber(accountNumber: number) {
        return await UserModel.findOne({ accountNumber: accountNumber }).exec();
    }
    async finByUserName(userName: string) {
        return await UserModel.findOne({ userName: userName }).exec();
    }
    async update(id: string, user: IUser) {
        return await UserModel.findByIdAndUpdate(id, user)
    }
    async delete(id: string) {
        return await UserModel.findByIdAndDelete(id)
    }
    async create(users: IUser) {
        return await UserModel.create(users)
    }
}