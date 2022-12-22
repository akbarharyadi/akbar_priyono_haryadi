import express from 'express';
import cors from 'cors';
export abstract class BaseRoutes {
    app: express.Application;
    nameRoute: string;

    constructor(app: express.Application, nameRoute: string) {
        this.app = app;
        this.nameRoute = nameRoute;

        // here we are adding middleware to parse all incoming requests as JSON 
        app.use(express.json());
        
        // here we are adding middleware to allow cross-origin requests
        app.use(cors());
        
        this.configureRoutes();
    }
    
    getName() {
        return this.nameRoute;
    }
    
    abstract configureRoutes(): express.Application;
}