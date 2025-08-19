import { AppService } from './app.service';
import { Request, Response } from 'express';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    health(request: Request, response: Response): {
        status: string;
        timestamp: string;
    };
}
