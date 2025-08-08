import mongoose from 'mongoose';
import { Task } from 'src/database/models/assignment.schema';
export declare class createAssignmentDto {
    ownerId: mongoose.Types.ObjectId;
    name: string;
    description: string;
    dueDate: Date;
    tasks: Task[];
}
