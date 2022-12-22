import { IUser } from "../model/interface/IUser";

declare global {
    namespace Express {
        interface User extends IUser {}
    }
}