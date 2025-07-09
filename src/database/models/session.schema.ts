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
  @Prop()
  userId: mongoose.Types.ObjectId;

  @Prop()
  status: SessionStatus;

  @Prop()
  expiresAt: Date;
}

export enum SessionStatus {
  ACTIVE,
  INACTIVE,
}

export const SessionSchema = SchemaFactory.createForClass(Session);
