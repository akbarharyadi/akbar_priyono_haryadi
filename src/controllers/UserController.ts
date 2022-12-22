
import { IUser } from '../model/interface/IUser';
import { UsersRepositories } from '../repositories/UserRepositories';
import { deleteCache, getAndSetDataCache } from '../service/redis';

export class UsersController {
    repo: UsersRepositories;

    constructor() {
        this.repo = new UsersRepositories()
    }

    async create(user: IUser) {
        let created_user = await this.repo.create(user);
        await getAndSetDataCache(created_user._id.toString(), created_user)
        return created_user;
    }

    async find(id: string) {
        let user: any = await getAndSetDataCache(id, null)
        if (user === null) {
            let db_user = await this.repo.finById(id);
            user = await getAndSetDataCache(id, db_user)
        }
        return JSON.parse(user)
    }

    async findByAccount(accountNumber: number) {
        let user: any = await getAndSetDataCache(accountNumber.toString(), null)
        if (user === null) {
            let db_user = await this.repo.finByAccountNumber(accountNumber);
            user = await getAndSetDataCache(accountNumber.toString(), db_user)
        }
        return JSON.parse(user)
    }

    async findByIdentity(identityNumber: number) {
        let user: any = await getAndSetDataCache(identityNumber.toString(), null)
        if (user === null) {
            let db_user = await this.repo.finByIdentityNumber(identityNumber);
            user = await getAndSetDataCache(identityNumber.toString(), db_user)
        }
        return JSON.parse(user)
    }

    async update(id: string, user: IUser) {
        await this.repo.update(id, user);
        let updated_user: any = await this.repo.finById(id);
        await getAndSetDataCache(updated_user._id.toString(), updated_user)
        return updated_user
    }

    async delete(id: string) {
        let user = await this.repo.delete(id);
        if (user) {
            await deleteCache(id);
            await deleteCache(user.accountNumber.toString());
            await deleteCache(user.identityNumber.toString());
        }
        return 'deleted'
    }
}