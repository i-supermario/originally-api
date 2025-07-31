import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';
import mongoose from 'mongoose';
import { Task, TaskStatus } from 'src/database/models/assignment.schema';

export class addTaskDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  status: TaskStatus;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;
}
