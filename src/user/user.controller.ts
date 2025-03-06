import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { Request, Response } from 'express';
import { FirebaseAuthService } from 'src/lib/firebase-auth/firebase-auth.service';
import z from 'zod';

@Controller('/user')
export class UserController {
  constructor(
    private userService: UserService,
    private readonly firebaseAuthService: FirebaseAuthService,
  ) {}

  @Post()
  async signUpUser(
    @Req() request: Request,
    @Res() response: Response,
    @Body() userData: CreateUserDto,
  ) {
    
    const inputFormat = z.object({
      token: z.string().trim(),
    });
    const body = inputFormat.parse(request.body);
    if (!body.token) {
      response.send({ message: 'Token not found' });
    }

    const decoded = await this.firebaseAuthService.verifyToken(body.token);
    if (!decoded.isVerified) {
      response.send({ message: 'Token could not be verified' });
    }

    const res = await this.userService.createUser(userData);
    if (!res.id) {
      return response.status(404).send({
        message: 'User could not be created',
      });
    }

    return response.status(200).send({
      message: 'User created successfully',
    });
  }
}
