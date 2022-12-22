import express from 'express';

import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import * as dotenv from 'dotenv'
import { BaseRoutes } from './routes/base_routes';
import { UserRoutes } from './routes/user_routes';
import debug from 'debug';


const app: express.Application = express();
// list all routes
const routes: Array<BaseRoutes> = [new UserRoutes((app))];
const debugLog: debug.IDebugger = debug('app');
dotenv.config()

// here we are preparing the expressWinston logging middleware configuration,
// which will automatically log all HTTP requests handled by Express.js
const loggerOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
    ),
};

if (!process.env.DEBUG) {
    loggerOptions.meta = false; // when not debugging, log requests as one-liners
}

// initialize the logger with the above configuration
app.use(expressWinston.logger(loggerOptions));

const runningMessage = `Hello`;
app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send(runningMessage)
});

// app.use("/kue-api/", kue.app);

routes.forEach((route: BaseRoutes) => {
    debugLog(`Routes configured for ${route.getName()}`);
});


export default app;