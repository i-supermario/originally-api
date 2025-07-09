import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpUserDto } from './dto/SignUpUser.dto';
import { Request, Response } from 'express';
import { FirebaseAuthService } from 'src/lib/firebase-auth/firebase-auth.service';
import { LoginUserDto } from './dto/LoginUser.dto';
import { SessionService } from 'src/session/session.service';
import { LogoutUserDto } from './dto/LogoutUser.dto';
@Controller('/user')
export class UserController {
  constructor(
    private sessionService: SessionService,
    private userService: UserService,
    private readonly firebaseAuthService: FirebaseAuthService,
  ) {}

  @Post('/sign-up')
  async signUpUser(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    @Body() userData: SignUpUserDto,
  ) {
    // const decoded = await this.firebaseAuthService.verifyToken(userData.token);
    // console.log(decoded);
    // if (!decoded.isVerified) {
    //   response.send({ message: 'Token could not be verified' });
    // }

    const { password, token, ...user } = userData;

    const res = await this.userService.createUser(user);
    if (!res) {
      return response.status(401).send({
        message: 'User could not be created',
      });
    }

    const session = await this.sessionService.createSession(res._id);

    response.cookie('sessionId', session.id, {
      expires: session.expiresAt,
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });
    return response.status(200).send({
      message: 'User created successfully',
      sessionId: session._id.toString(),
      email: user.email,
    });
  }

  @Post('/login')
  async loginUser(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    @Body() body: LoginUserDto,
  ) {
    // Check if user exists
    const user = await this.userService.findUserByEmail(body.email);

    // Create session
    if (!user) {
      return response.status(401).send({ message: 'User not found' });
    }
    // Verify token
    // const decoded = await this.firebaseAuthService.verifyToken(body.token);
    // console.log(decoded);
    // if (!decoded.isVerified) {
    //   return response
    //     .status(401)
    //     .send({ message: 'Token could not be verified' });
    // }

    // Check if user already logged
    const oldSession = await this.sessionService.findActiveSessionByUserId(
      user._id,
    );

    if (oldSession) {
      response.cookie('sessionId', oldSession.id, {
        expires: oldSession.expiresAt,
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
      });
      return response.status(200).send({
        message: 'User logged in successfully',
        sessionId: oldSession._id.toString(),
        email: user.email,
      });
    }

    const newSession = await this.sessionService.createSession(user._id);

    if (newSession) {
      response.cookie('sessionId', newSession.id, {
        expires: newSession.expiresAt,
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
      });
      return response.status(200).send({
        message: 'User logged in successfully',
        sessionId: newSession._id.toString(),
        email: user.email,
      });
    } else {
      return response
        .status(401)
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
      return response.status(400).send({
        message: 'User not found',
      });
    }
    const session = await this.sessionService.findActiveSessionByUserId(
      user._id,
    );

    if (!session) {
      return response.status(400).send({
        message: 'session not found',
      });
    }
    response.cookie('sessionId', '', {
      expires: new Date(),
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });
    await this.sessionService.closeActiveSession(session._id);
    return response.status(200).send({
      message: 'User logged out successfully',
    });
  }
}
