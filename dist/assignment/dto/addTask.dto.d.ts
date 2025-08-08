import { TaskStatus } from 'src/database/models/assignment.schema';
export declare class addTaskDto {
    name: string;
    description: string;
    status: TaskStatus;
    latitude: number;
    longitude: number;
}
