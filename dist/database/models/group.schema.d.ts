import mongoose, { HydratedDocument } from 'mongoose';
export type GroupDocument = HydratedDocument<Group>;
export declare enum GroupStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE"
}
export declare class Group {
    ownerId: mongoose.Types.ObjectId;
    name: string;
    description: string;
    memberIds: mongoose.Types.ObjectId[];
    status: GroupStatus;
}
export declare const groupSchema: mongoose.Schema<Group, mongoose.Model<Group, any, any, any, mongoose.Document<unknown, any, Group, any> & Group & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Group, mongoose.Document<unknown, {}, mongoose.FlatRecord<Group>, {}> & mongoose.FlatRecord<Group> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
