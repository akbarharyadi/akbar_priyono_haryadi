import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import { Strategy as LocalStrategy } from "passport-local";
import { UsersRepositories } from "../repositories/UserRepositories";
import { SECRET_KEY } from '../config';

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET_KEY
}
const userRepo = new UsersRepositories();

passport.use(new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password'
    },
    async function (username, password, done) {
        let user = await userRepo.finByUserName(username)

        if (user === null) {
            return done(null, false, { message: 'Incorrect username.' });
        }

        return done(null, user);

    }
))

passport.use(
    new JwtStrategy(options, async function (jwt_payload, done) {
        let user: any = await userRepo.finByIdentityNumber(jwt_payload.identityNumber);
        done(null, user);
    })
);

export { passport } 