import { Type } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';
import mongoose from 'mongoose';
import { Task } from 'src/database/models/assignment.schema';

export class createAssignmentDto {
  @IsString()
  ownerId: mongoose.Types.ObjectId;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDate()
  @Type(() => Date)
  dueDate: Date;

  tasks: Task[];
}
