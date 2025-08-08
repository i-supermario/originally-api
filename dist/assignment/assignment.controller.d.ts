import { AssignmentService } from './assignment.service';
import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { createAssignmentDto } from './dto/createAssignment.dto';
import { addTaskDto } from './dto/addTask.dto';
import { UserService } from 'src/user/user.service';
import { Assignment } from 'src/database/models/assignment.schema';
import { User } from 'src/database/models/user.schema';
import { AssignmentDetails } from 'src/common/types/assignment';
export declare class AssignmentController {
    private readonly assignmentService;
    private readonly userService;
    constructor(assignmentService: AssignmentService, userService: UserService);
    createAssignment(request: Request, response: Response, body: createAssignmentDto): Promise<{
        message: string;
    }>;
    getAssignment(request: Request, response: Response, assignmentId: mongoose.Types.ObjectId): Promise<{
        message: string;
        data?: undefined;
    } | {
        data: AssignmentDetails;
        message?: undefined;
    }>;
    getAllAssignments(request: Request, response: Response, userId: mongoose.Types.ObjectId): Promise<{
        data: (mongoose.Document<unknown, {}, Assignment, {}> & Assignment & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        } & {
            assigneeDetails: User | null;
            ownerDetails: User | null;
        })[];
    }>;
    deleteAssignment(request: Request, response: Response, assignmentId: mongoose.Types.ObjectId): Promise<{
        message: string;
    }>;
    addTask(request: Request, response: Response, assignmentId: mongoose.Types.ObjectId, body: addTaskDto): Promise<{
        message: string;
    }>;
    assignTaskTo(request: Request, response: Response, assignmentId: mongoose.Types.ObjectId, body: {
        email: string;
    }): Promise<{
        message: string;
    }>;
    completeTask(request: Request, response: Response, assignmentId: mongoose.Types.ObjectId, taskId: mongoose.Types.ObjectId): Promise<{
        message: string;
    }>;
    reorderTasks(request: Request, response: Response, assignmentId: mongoose.Types.ObjectId, orderedTaskIds: mongoose.Types.ObjectId[]): Promise<mongoose.UpdateWriteOpResult>;
}
