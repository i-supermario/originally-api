import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpUserDto } from './dto/SignUpUser.dto';
import { Request, Response } from 'express';
import { LoginUserDto } from './dto/LoginUser.dto';
import { SessionService } from 'src/session/session.service';
import { LogoutUserDto } from './dto/LogoutUser.dto';
@Controller('/user')
export class UserController {
  constructor(
    private sessionService: SessionService,
    private userService: UserService,
  ) {}

  @Post('/sign-up')
  async signUpUser(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    @Body() userData: SignUpUserDto,
  ) {
    const { password, token, ...user } = userData;

    const res = await this.userService.createUser(user);
    if (!res) {
      return response.status(500).send({
        message: 'User could not be created',
      });
    }

    const session = await this.sessionService.createSession(res._id);

    response.cookie('sessionId', session.id, {
      expires: session.expiresAt,
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    return response.status(200).send({
      message: 'User created successfully',
      sessionId: session._id.toString(),
      email: user.email,
      userId: res._id,
    });
  }

  @Post('/login')
  async loginUser(
    @Req() request: Request,
    @Res({
      passthrough: true,
    })
    response: Response,
    @Body() body: LoginUserDto,
  ) {
    // Check if user exists
    const user = await this.userService.findUserByEmail(body.email);

    // Create session
    if (!user) {
      return response.status(401).send({ message: 'User not found' });
    }
    const oldSession = await this.sessionService.findActiveSessionByUserId(
      user._id,
    );

    if (oldSession && oldSession.expiresAt.getDate() > Date.now()) {
      response.cookie('sessionId', oldSession.id, {
        expires: oldSession.expiresAt,
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });

      return response.status(200).send({
        message: 'User logged in successfully',
        sessionId: oldSession._id.toString(),
        email: user.email,
        userId: user._id.toString(),
      });
    }

    const newSession = await this.sessionService.createSession(user._id);

    if (newSession) {
      response.cookie('sessionId', newSession.id, {
        expires: newSession.expiresAt,
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });
      return response.status(200).send({
        message: 'User logged in successfully',
        sessionId: newSession._id.toString(),
        email: user.email,
        userId: user._id.toString(),
      });
    } else {
      return response
        .status(200)
        .send({ message: 'Session could not be created' });
    }
  }

  @Post('/logout')
  async logoutUser(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    @Body() body: LogoutUserDto,
  ) {
    // Check if user exists
    const user = await this.userService.findUserByEmail(body.email);
    if (!user) {
      return response.status(404).send({
        message: 'User not found',
      });
    }
    const session = await this.sessionService.findActiveSessionByUserId(
      user._id,
    );

    if (!session) {
      return response.status(404).send({
        message: 'session not found',
      });
    }
    response.cookie('sessionId', '', {
      expires: new Date(),
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    await this.sessionService.closeActiveSession(session._id);
    return response.status(200).send({
      message: 'User logged out successfully',
    });
  }
}
