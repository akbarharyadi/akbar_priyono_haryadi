import { BaseRoutes } from './base_routes';
import express from 'express';
import { passport as passport_jwt } from '../service/passport_jwt'
import { UsersController } from './../controllers/users_controllers';

export class UserRoutes extends BaseRoutes {
    user: UsersController
    configureRoutes() {

        this.app.route(`/users`)
            .post(async (req: express.Request, res: express.Response) => {
                try {
                    let user = await this.user.create(req.body)
                    res.status(200).send(user);
                } catch (error) {
                    console.log(error)
                    res.status(500).send(error);
                }
            });

        this.app.route(`/users/:id`)
            .put(async (req: express.Request, res: express.Response) => {
                try {
                    let update = await this.user.update(req.params.id, req.body);
                    res.status(200).send(update);
                } catch (error) {
                    res.status(500).send(error);
                }
            })
            .get(async (req: express.Request, res: express.Response) => {
                try {
                    let update = await this.user.find(req.params.id);
                    res.status(200).send(update);
                } catch (error) {
                    res.status(500).send(error);
                }
            })
            .delete(async (req: express.Request, res: express.Response) => {
                try {
                    let deleted = await this.user.delete(req.params.id);
                    res.status(200).send(deleted);
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