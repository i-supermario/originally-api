import { Body, Controller, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async signUpUser(
    @Body()
    userData: CreateUserDto,
  ): Promise<User> {
    const response = await this.userService.createUser(userData);
    return response;
  }
}
