import { SECRET_KEY } from "../../src/config";
import { AuthController } from "../../src/controllers/AuthController";
import { IUser } from "../../src/model/interface/IUser";
import jwt from 'jsonwebtoken'

const user: IUser = {
    "userName": "akbarharyadi",
    "accountNumber": 7829382882932932,
    "emailAddress": "akbarharyadi@outlook.com",
    "identityNumber": 7239128731289391
}

let payload = { identityNumber: user.identityNumber };
let token = jwt.sign(payload, SECRET_KEY);

describe('controller -> auth', () => {
    const controller = new AuthController();

    test('register user return valid user and token', async () => {
        const response = await controller.getToken(user)
        expect(response).toEqual(token)
    })

    test('register user return fail', async () => {
        try {
            let user:IUser = null as unknown as IUser;
            const response = await controller.getToken(user)
            expect(response).toEqual(token)
        } catch (error) {
            expect(error).toBeInstanceOf(TypeError);
        }
    })
})