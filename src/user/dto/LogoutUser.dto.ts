import { IsEmail, IsString } from 'class-validator';

export class LogoutUserDto {
  @IsString()
  @IsEmail()
  email: string;

}
