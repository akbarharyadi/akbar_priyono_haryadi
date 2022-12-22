import express from 'express';

import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import * as dotenv from 'dotenv'
import { BaseRoutes } from './routes/BaseRoutes';
import { UserRoutes } from './routes/UserRoutes';
import { AuthRoutes } from './routes/AuthRoutes';



const app: express.Application = express();
// list all routes
const routes: Array<BaseRoutes> = [new UserRoutes((app)), new AuthRoutes((app))];
dotenv.config()

const runningMessage = `Hello`;
app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send(runningMessage)
});

// routes.forEach((route: BaseRoutes) => {
    // console.log(`Routes configured for ${route.getName()}`);
// });


export default app;