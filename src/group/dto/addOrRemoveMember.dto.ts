import { IsString } from 'class-validator';
import mongoose from 'mongoose';

export class addOrRemoveMemberDto {
  @IsString()
  memberId: mongoose.Types.ObjectId;
}
