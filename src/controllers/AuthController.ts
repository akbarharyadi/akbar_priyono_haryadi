
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config';
import { IUser } from '../model/interface/IUser';

export class AuthController {

    async getToken(user: IUser) {
        if (!user) {
            throw new TypeError("User Not Found!");
        }
        let payload = { identityNumber: user.identityNumber };
        let token = jwt.sign(payload, SECRET_KEY);
        return token
    }
}