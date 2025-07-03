import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { SessionService } from 'src/session/session.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly sessionService: SessionService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    // Are we sending userId or sessionId to validate the auth?

    const sessionId = request.cookies?.sessionId || '';

    if (!sessionId) {
      throw new UnauthorizedException(
        'No session ID found. Unauthorized access.'
      );
    }

    const session = await this.sessionService.findActiveSessionBySessionId(sessionId);
    if (!session || session.expiresAt < new Date()) {
      throw new UnauthorizedException('Session invalid or expired');
    }

    return true;
  }
}
