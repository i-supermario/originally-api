import { IsString } from 'class-validator';
import mongoose from 'mongoose';

export class addMemberDto {
  @IsString()
  groupId: mongoose.Types.ObjectId;

  @IsString()
  memberId: mongoose.Types.ObjectId;
}
