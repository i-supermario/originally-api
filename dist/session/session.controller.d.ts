import { SessionService } from './session.service';
import { Request, Response } from 'express';
import { UserService } from 'src/user/user.service';
export declare class SessionController {
    private sessionService;
    private userService;
    constructor(sessionService: SessionService, userService: UserService);
    getUserSessionInfo(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
}
