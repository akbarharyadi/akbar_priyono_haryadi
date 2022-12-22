
import { UsersRepositories } from './../repositories/user_repositories';
import { Users } from '@prisma/client';

export class UsersController {
    repo: UsersRepositories;

    constructor() {
        this.repo = new UsersRepositories()
    }

    async create(user: Users) {
        return await this.repo.create(user);
    }

    async find(id: string) {
        const created = await this.repo.finById(id)
        return created;
    }

    async update(id: string, user: Users) {
        const update = await this.repo.update(id, user)
        return update;
    }

    async delete(id: string) {
        const deleted = await this.repo.delete(id);
        return deleted;
    }
}