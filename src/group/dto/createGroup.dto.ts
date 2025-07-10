import { IsString } from 'class-validator';
import mongoose from 'mongoose';

export class createGroupDto {
  @IsString()
  ownerId: mongoose.Types.ObjectId;

  @IsString()
  name: string;

  @IsString()
  description: string;

  members: mongoose.Types.ObjectId[];
}
