import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password?: string;

  @IsString()
  token?: string;
}
