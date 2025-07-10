import { Injectable } from '@nestjs/common';
import {
  Session,
  SessionDocument,
  SessionStatus,
} from 'src/database/models/session.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel(Session.name) private sessionModel: Model<SessionDocument>,
  ) {}

  async createSession(
    userId: mongoose.Types.ObjectId,
  ): Promise<SessionDocument> {
    return this.sessionModel.create({
      userId: userId,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000,
      status: SessionStatus.ACTIVE,
    });
  }

  async findActiveSessionBySessionId(
    sessionId: mongoose.Types.ObjectId,
  ): Promise<SessionDocument | null> {
    return this.sessionModel.findOne({
      _id: sessionId,
      status: SessionStatus.ACTIVE,
    });
  }

  async findActiveSessionByUserId(
    userId: mongoose.Types.ObjectId,
  ): Promise<SessionDocument | null> {
    return this.sessionModel.findOne({
      userId: userId,
      status: SessionStatus.ACTIVE,
    });
  }

  async extendSessionTimeBy(
    sessionId: mongoose.Types.ObjectId,
    duration: number = 24 * 60 * 60 * 1000,
  ): Promise<SessionDocument | null> {
    return this.sessionModel.findOneAndUpdate(
      {
        _id: sessionId,
      },
      {
        expiresAt: Date.now() + duration,
      },
    );
  }

  async closeActiveSession(
    sessionId: mongoose.Types.ObjectId,
  ): Promise<SessionDocument | null> {
    return this.sessionModel.findOneAndUpdate(
      {
        _id: sessionId,
      },
      {
        status: SessionStatus.INACTIVE,
      },
    );
  }
}
