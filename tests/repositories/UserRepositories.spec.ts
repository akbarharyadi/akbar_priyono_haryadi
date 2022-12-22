import { IUser } from "../../src/model/interface/IUser";
import { mongoose } from "../../src/service/mongose";
import { UsersRepositories } from '../../src/repositories/UserRepositories';

const user: IUser = {
    "userName": "akbarharyadi",
    "accountNumber": 7829382882932932,
    "emailAddress": "akbarharyadi@outlook.com",
    "identityNumber": 7239128731289391
}

const userUpdate:IUser = {
    "userName": "akbarharyadiXYZ",
    "accountNumber": 7829382882932932111,
    "emailAddress": "edit_akbarharyadi@outlook.com",
    "identityNumber": 7239128731289391111
}


afterAll(async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
});

describe('repositories ->', () => {
    const repositories = new UsersRepositories();
    var id: string;
    test('create -> create user return valid user', async () => {
        const response = await repositories.create(user)
        id = response.id
        expect(response.userName).toEqual(user.userName)
        expect(response.accountNumber).toEqual(user.accountNumber)
        expect(response.emailAddress).toEqual(user.emailAddress)
        expect(response.identityNumber).toEqual(user.identityNumber)
    })

    test('finById -> find user return valid user', async () => {
        const response = await repositories.finById(id)
        if (response !== null) {
            expect(response.userName).toEqual(user.userName)
            expect(response.accountNumber).toEqual(user.accountNumber)
            expect(response.emailAddress).toEqual(user.emailAddress)
            expect(response.identityNumber).toEqual(user.identityNumber)
        } else {
            expect(response).toEqual(null)
        }
    })

    test('finByAccountNumber -> find user by Accound Number return valid user', async () => {
        const response = await repositories.finByAccountNumber(user.accountNumber)
        if (response !== null) {
            expect(response.userName).toEqual(user.userName)
            expect(response.accountNumber).toEqual(user.accountNumber)
            expect(response.emailAddress).toEqual(user.emailAddress)
            expect(response.identityNumber).toEqual(user.identityNumber)
        } else {
            expect(response).toEqual(null)
        }
    })

    test('finByUserName -> find user by Identity Number return valid user', async () => {
        const response = await repositories.finByUserName(user.userName)
        if (response !== null) {
            expect(response.userName).toEqual(user.userName)
            expect(response.accountNumber).toEqual(user.accountNumber)
            expect(response.emailAddress).toEqual(user.emailAddress)
            expect(response.identityNumber).toEqual(user.identityNumber)
        } else {
            expect(response).toEqual(null)
        }
    })

    test('update -> update user return valid user', async () => {
        const response = await repositories.update(id, userUpdate)
        if (response !== null) {
            expect(response.userName).toEqual(user.userName)
            expect(response.accountNumber).toEqual(user.accountNumber)
            expect(response.emailAddress).toEqual(user.emailAddress)
            expect(response.identityNumber).toEqual(user.identityNumber)
        } else {
            expect(response).toEqual(null)
        }
    })

    test('delete -> delete user return deleted', async () => {
        const response = await repositories.delete(id)
        if (response !== null) {
            expect(response.userName).toEqual(userUpdate.userName)
            expect(response.accountNumber).toEqual(userUpdate.accountNumber)
            expect(response.emailAddress).toEqual(userUpdate.emailAddress)
            expect(response.identityNumber).toEqual(userUpdate.identityNumber)
        } else {
            expect(response).toEqual(null)
        }
    })

})