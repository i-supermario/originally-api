import { UserService } from './user.service';
import { SignUpUserDto } from './dto/SignUpUser.dto';
import { Request, Response } from 'express';
import { LoginUserDto } from './dto/LoginUser.dto';
import { SessionService } from 'src/session/session.service';
import { LogoutUserDto } from './dto/LogoutUser.dto';
export declare class UserController {
    private sessionService;
    private userService;
    constructor(sessionService: SessionService, userService: UserService);
    signUpUser(request: Request, response: Response, userData: SignUpUserDto): Promise<Response<any, Record<string, any>>>;
    loginUser(request: Request, response: Response, body: LoginUserDto): Promise<Response<any, Record<string, any>>>;
    logoutUser(request: Request, response: Response, body: LogoutUserDto): Promise<Response<any, Record<string, any>>>;
}
