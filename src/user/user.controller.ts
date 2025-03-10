import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpUserDto } from './dto/SignUpUser.dto';
import { Request, Response } from 'express';
import { FirebaseAuthService } from 'src/lib/firebase-auth/firebase-auth.service';
import { LoginUserDto } from './dto/LoginUser.dto';
import { SessionService } from 'src/session/session.service';
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
    @Res() response: Response,
    @Body() userData: SignUpUserDto,
  ) {
    if (!userData.token) {
      response.send({ message: 'Token not found' });
    }

    const decoded = await this.firebaseAuthService.verifyToken(
      userData.token || '',
    );
    if (!decoded.isVerified) {
      response.send({ message: 'Token could not be verified' });
    }

    const res = await this.userService.createUser(userData);
    if (!res.id) {
      return response.status(404).send({
        message: 'User could not be created',
      });
    }

    response.status(200).send({
      message: 'User created successfully',
    });
    return;
  }

  @Post('/login')
  async loginUser(
    @Req() request: Request,
    @Res() response: Response,
    @Body() body: LoginUserDto,
  ) {
    if (!body.token) {
      response.send({ message: 'Token not found' });
    }

    // Check if user exists
    const user = await this.userService.findUserByEmail(body.email);

    // Create session
    if (user) {
      // Check if user already logged
      const oldSession = await this.sessionService.findActiveSessionByUserId(
        user.id,
      );

      if (oldSession) {
        await this.sessionService.extendSessionTimeBy(oldSession.id);
      }
      // Verify token
      const decoded = await this.firebaseAuthService.verifyToken(
        body.token || '',
      );
      if (!decoded.isVerified) {
        response.send({ message: 'Token could not be verified' });
      }

      const newSession = await this.sessionService.createSession(user.id);

      if (newSession) {
        response.send({
          message: 'User logged in successfully',
          sessionId: newSession.id,
        });
      } else {
        response.send({ message: 'Session could not be created' });
      }
    } else {
      response.send({ message: 'User not found' });
    }
    return;
  }
}
