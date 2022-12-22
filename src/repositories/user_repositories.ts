import { PrismaClient, Users } from '@prisma/client'

export class UsersRepositories {
    orm!: PrismaClient;

    constructor() {
        this.orm = new PrismaClient();
    }

    
    async finById(id: string) {
        throw new Error('Method not implemented.');
    }
    async update(id: string, user: any) {
        throw new Error('Method not implemented.');
    }
    async delete(id: string) {
        throw new Error('Method not implemented.');
    }
    async create(users: Users) {
        return await this.orm.users.create({
            data: users,
        });
    }

}