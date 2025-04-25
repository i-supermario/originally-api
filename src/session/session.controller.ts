import { Controller, Get, Req, Res, } from '@nestjs/common';
import { SessionService } from './session.service';
import { Request, Response } from 'express';
import { UserService } from 'src/user/user.service';

@Controller('/session')
export class SessionController {
  constructor(
    private sessionService: SessionService,
    private userService: UserService,
  ) {}

  @Get('/user-info')
  async getUserSessionInfo(@Req() request: Request, @Res() response: Response) {
    const sessionId: number = request.cookies.sessionId;

    const sessionInfo =
      await this.sessionService.findActiveSessionBySessionId(sessionId);
    const userInfo = await this.userService.findUserById(sessionInfo?.userId);

    return response.status(200).send({
      email: userInfo?.email,
      sessionId: sessionId,
    });
  }
}
