import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type AssignmentDocument = HydratedDocument<Assignment>;
export type TaskDocument = HydratedDocument<Task>;

export enum TaskStatus {
  ACTIVE = 'ACTIVE',
  PROGRESSING = 'PROGRESSING',
  FINISHED = 'FINISHED',
}

@Schema({
  _id: true,
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Task {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ enum: TaskStatus, default: TaskStatus.ACTIVE })
  status: TaskStatus;

  @Prop({ required: true })
  latitude: number;

  @Prop({ required: true })
  longitude: number;
}

@Schema({
  _id: true,
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Assignment {
  @Prop({ required: true })
  ownerId: mongoose.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: [] })
  tasks: Task[];

  @Prop({ required: true })
  dueDate: Date;
}

export const assignmentSchema = SchemaFactory.createForClass(Assignment);
