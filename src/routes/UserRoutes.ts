import { BaseRoutes } from './BaseRoutes';
import express from 'express';
import { passport } from '../service/passport'
import { UsersController } from '../controllers/UserController';

export class UserRoutes extends BaseRoutes {
    user: UsersController
    configureRoutes() {

        this.app.route(`/users`)
            .post(passport.authenticate('jwt', { session: false }), async (req: express.Request, res: express.Response) => {
                try {
                    let user = await this.user.create(req.body)
                    res.status(200).send(user);
                } catch (error) {
                    res.status(500).send(error);
                }
            });

        this.app.route(`/users/:id`)
            .put(passport.authenticate('jwt', { session: false }), async (req: express.Request, res: express.Response) => {
                try {
                    let update = await this.user.update(req.params.id, req.body);
                    res.status(200).send(update);
                } catch (error) {
                    res.status(500).send(error);
                }
            })
            .get(passport.authenticate('jwt', { session: false }), async (req: express.Request, res: express.Response) => {
                try {
                    let user = await this.user.find(req.params.id);
                    res.status(200).send(user);
                } catch (error) {
                    res.status(500).send(error);
                }
            })
            .delete(passport.authenticate('jwt', { session: false }), async (req: express.Request, res: express.Response) => {
                try {
                    let deleted = await this.user.delete(req.params.id);
                    res.status(200).send({
                        message: 'user has been deleted'
                    });
                } catch (error) {
                    res.status(500).send(error);
                }
            });


        this.app.route(`/users/account-number/:accountnumber`)
            .get(passport.authenticate('jwt', { session: false }), async (req: express.Request, res: express.Response) => {
                try {
                    let user = await this.user.findByAccount(parseFloat(req.params.accountnumber));
                    res.status(200).send(user);
                } catch (error) {
                    res.status(500).send(error);
                }
            });


        this.app.route(`/users/identity-number/:identitynumber`)
            .get(passport.authenticate('jwt', { session: false }), async (req: express.Request, res: express.Response) => {
                try {
                    let user = await this.user.findByIdentity(parseFloat(req.params.identitynumber));
                    res.status(200).send(user);
                } catch (error) {
                    res.status(500).send(error);
                }
            });

        return this.app;
    }

    constructor(app: express.Application) {
        super(app, 'AuthRoutes');
        this.user = new UsersController()
    }
}