import { CanActivate, ExecutionContext } from '@nestjs/common';
import { SessionService } from 'src/session/session.service';
export declare class AuthGuard implements CanActivate {
    private readonly sessionService;
    constructor(sessionService: SessionService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
