import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type SessionDocument = HydratedDocument<Session>;

@Schema({
  _id: true,
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Session {
  @Prop({ required: true })
  userId: mongoose.Types.ObjectId;

  @Prop({ required: true })
  status: SessionStatus;

  @Prop({ required: true })
  expiresAt: Date;
}

export enum SessionStatus {
  ACTIVE,
  INACTIVE,
}

export const SessionSchema = SchemaFactory.createForClass(Session);
