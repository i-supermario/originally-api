import { IsString } from 'class-validator';
import mongoose from 'mongoose';

export class userIdDto {
  @IsString()
  userId: mongoose.Types.ObjectId;
}
