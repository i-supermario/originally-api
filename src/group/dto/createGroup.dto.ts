import { IsString } from 'class-validator';

export class createGroupDto {
  @IsString()
  ownerId: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  members: string[];
}
