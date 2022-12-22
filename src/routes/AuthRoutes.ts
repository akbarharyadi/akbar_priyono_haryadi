
import express from 'express';
import { passport } from '../service/passport'
import { BaseRoutes } from './BaseRoutes';
import { AuthController } from './../controllers/AuthController';
import { UsersController } from '../controllers/UserController';

export class AuthRoutes extends BaseRoutes {
    auth: AuthController
    user: UsersController
    configureRoutes() {

        this.app.route(`/auth/login`)
            .post(passport.authenticate("local", { session: false }), async (req: express.Request, res: express.Response) => {
                try {
                    let user: any = req.user;
                    let token = await this.auth.getToken(user)
                    res.status(200).send({ token: token })
                } catch (error) {
                    res.status(500).send(error)
                }
            });

        this.app.route(`/auth/register`)
            .post(async (req: express.Request, res: express.Response) => {
                try {
                    let user = await this.user.create(req.body)
                    let token = await this.auth.getToken(user)
                    res.status(200).send({ token: token, user: user })
                } catch (error) {
                    res.status(500).send(error)
                }
            });

        return this.app;
    }

    constructor(app: express.Application) {
        super(app, 'AuthRoutes');
        this.auth = new AuthController()
        this.user = new UsersController()
    }
}