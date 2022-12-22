import { IUser } from "../../src/model/interface/IUser";
import { mongoose } from "../../src/service/mongose";
import { UsersController } from '../../src/controllers/UserController';

const user: IUser = {
    "userName": "akbarharyadi",
    "accountNumber": 7829382882932932,
    "emailAddress": "akbarharyadi@outlook.com",
    "identityNumber": 7239128731289391
}

const userUpdate: IUser = {
    "userName": "akbarharyadiXYZ",
    "accountNumber": 7829382882932932111,
    "emailAddress": "edit_akbarharyadi@outlook.com",
    "identityNumber": 7239128731289391111
}

afterAll(async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
});

describe('controller ->', () => {
    const controller = new UsersController();
    var id: string;
    test('create -> create user return valid user', async () => {
        const response = await controller.create(user)
        id = response.id
        expect(response.userName).toEqual(user.userName)
        expect(response.accountNumber).toEqual(user.accountNumber)
        expect(response.emailAddress).toEqual(user.emailAddress)
        expect(response.identityNumber).toEqual(user.identityNumber)
    })

    test('find -> find user return valid user', async () => {
        const response = await controller.find(id)
        expect(response.userName).toEqual(user.userName)
        expect(response.accountNumber).toEqual(user.accountNumber)
        expect(response.emailAddress).toEqual(user.emailAddress)
        expect(response.identityNumber).toEqual(user.identityNumber)
    })

    test('findByAccount -> find user by Accound Number return valid user', async () => {
        const response = await controller.findByAccount(user.accountNumber)
        expect(response.userName).toEqual(user.userName)
        expect(response.accountNumber).toEqual(user.accountNumber)
        expect(response.emailAddress).toEqual(user.emailAddress)
        expect(response.identityNumber).toEqual(user.identityNumber)
    })

    test('findByIdentity -> find user by Identity Number return valid user', async () => {
        const response = await controller.findByIdentity(user.identityNumber)
        expect(response.userName).toEqual(user.userName)
        expect(response.accountNumber).toEqual(user.accountNumber)
        expect(response.emailAddress).toEqual(user.emailAddress)
        expect(response.identityNumber).toEqual(user.identityNumber)
    })

    test('update -> update user return valid user', async () => {
        const response = await controller.update(id, userUpdate)
        expect(response.userName).toEqual(userUpdate.userName)
        expect(response.accountNumber).toEqual(userUpdate.accountNumber)
        expect(response.emailAddress).toEqual(userUpdate.emailAddress)
        expect(response.identityNumber).toEqual(userUpdate.identityNumber)
    })

    test('delete -> delete user return deleted', async () => {
        const response = await controller.delete(id)
        expect(response).toEqual('deleted')
    })

})