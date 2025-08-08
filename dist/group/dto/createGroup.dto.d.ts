import mongoose from 'mongoose';
export declare class createGroupDto {
    ownerId: mongoose.Types.ObjectId;
    name: string;
    description: string;
    members: mongoose.Types.ObjectId[];
}
