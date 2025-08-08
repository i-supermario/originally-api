import mongoose, { Model } from 'mongoose';
import { AssignmentDetails } from 'src/common/types/assignment';
import { Assignment, AssignmentDocument, Task } from 'src/database/models/assignment.schema';
export declare class AssignmentService {
    private assignmentModel;
    constructor(assignmentModel: Model<AssignmentDocument>);
    createAssignment(data: Partial<Assignment>): Promise<Assignment>;
    deleteAssignmentById(id: mongoose.Types.ObjectId): Promise<(mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Assignment, {}> & Assignment & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, {}> & mongoose.Document<unknown, {}, Assignment, {}> & Assignment & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>) | null>;
    findAssignmentById(id: mongoose.Types.ObjectId): Promise<Assignment | null>;
    findAssignmentsByOwnerId(ownerId: mongoose.Types.ObjectId): Promise<Assignment[]>;
    findAssignmentByAssigneeId(assigneeId: mongoose.Types.ObjectId): Promise<Assignment[]>;
    findAssignmentDetailsById(id: mongoose.Types.ObjectId): Promise<AssignmentDetails>;
    addTaskToAssignment(assignmentId: mongoose.Types.ObjectId, task: Task): Promise<Assignment | null>;
    removeTaskFromAssignment(assignmentId: mongoose.Types.ObjectId, taskId: mongoose.Types.ObjectId): Promise<mongoose.UpdateWriteOpResult>;
    startTaskInAssignment(assignmentId: mongoose.Types.ObjectId, taskId: mongoose.Types.ObjectId): Promise<mongoose.UpdateWriteOpResult>;
    assignTaskTo(assignmentId: mongoose.Types.ObjectId, assigneeId: mongoose.Types.ObjectId): Promise<(mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Assignment, {}> & Assignment & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, {}> & mongoose.Document<unknown, {}, Assignment, {}> & Assignment & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>) | null>;
    endTaskInAssignment(assignmentId: mongoose.Types.ObjectId, taskId: mongoose.Types.ObjectId): Promise<mongoose.UpdateWriteOpResult>;
    rearrangeTasks(assignmentId: mongoose.Types.ObjectId, orderedTaskIds: mongoose.Types.ObjectId[]): Promise<mongoose.UpdateWriteOpResult>;
}
