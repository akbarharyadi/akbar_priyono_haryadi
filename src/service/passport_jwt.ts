import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import { UsersRepositories } from "../repositories/user_repositories";
import { SECRET_KEY } from '../config';

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET_KEY
}

passport.use(
    new JwtStrategy(options, async function (jwt_payload, done) {
        console.log('payload received', jwt_payload);
        let userRepo = new UsersRepositories();
        // const user: any = await userRepo.findByGoogleId(jwt_payload.google_id);

        // done(null, user);
    })
);

export { passport } 