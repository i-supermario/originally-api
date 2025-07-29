import { IsString } from 'class-validator';

export class addOrRemoveMemberDto {
  @IsString()
  email: string;
}
