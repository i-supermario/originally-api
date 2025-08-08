import mongoose, { HydratedDocument } from 'mongoose';
export type AssignmentDocument = HydratedDocument<Assignment>;
export type TaskDocument = HydratedDocument<Task>;
export declare enum TaskStatus {
    ACTIVE = "ACTIVE",
    PROGRESSING = "PROGRESSING",
    FINISHED = "FINISHED"
}
export declare class Task {
    name: string;
    description: string;
    status: TaskStatus;
    latitude: number;
    longitude: number;
}
export declare class Assignment {
    ownerId: mongoose.Types.ObjectId;
    assigneeId: mongoose.Types.ObjectId;
    name: string;
    description: string;
    tasks: Task[];
    dueDate: Date;
}
export declare const assignmentSchema: mongoose.Schema<Assignment, mongoose.Model<Assignment, any, any, any, mongoose.Document<unknown, any, Assignment, any> & Assignment & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Assignment, mongoose.Document<unknown, {}, mongoose.FlatRecord<Assignment>, {}> & mongoose.FlatRecord<Assignment> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
