import mongoose, { HydratedDocument } from 'mongoose';
export type SessionDocument = HydratedDocument<Session>;
export declare class Session {
    userId: mongoose.Types.ObjectId;
    status: SessionStatus;
    expiresAt: Date;
}
export declare enum SessionStatus {
    ACTIVE = 0,
    INACTIVE = 1
}
export declare const SessionSchema: mongoose.Schema<Session, mongoose.Model<Session, any, any, any, mongoose.Document<unknown, any, Session, any> & Session & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Session, mongoose.Document<unknown, {}, mongoose.FlatRecord<Session>, {}> & mongoose.FlatRecord<Session> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
