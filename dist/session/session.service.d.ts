import { SessionDocument } from 'src/database/models/session.schema';
import mongoose, { Model } from 'mongoose';
export declare class SessionService {
    private sessionModel;
    constructor(sessionModel: Model<SessionDocument>);
    createSession(userId: mongoose.Types.ObjectId): Promise<SessionDocument>;
    findActiveSessionBySessionId(sessionId: mongoose.Types.ObjectId): Promise<SessionDocument | null>;
    findActiveSessionByUserId(userId: mongoose.Types.ObjectId): Promise<SessionDocument | null>;
    extendSessionTimeBy(sessionId: mongoose.Types.ObjectId, duration?: number): Promise<SessionDocument | null>;
    closeActiveSession(sessionId: mongoose.Types.ObjectId): Promise<SessionDocument | null>;
}
