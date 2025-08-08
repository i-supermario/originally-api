import { User, UserDocument } from 'src/database/models/user.schema';
import mongoose, { Model } from 'mongoose';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    createUser(data: User): Promise<UserDocument>;
    updateUser(id: mongoose.Types.ObjectId, data: Partial<User>): Promise<UserDocument | null>;
    deleteUser(id: mongoose.Types.ObjectId): Promise<UserDocument | null>;
    findUserById(id: mongoose.Types.ObjectId): Promise<UserDocument | null>;
    findUserByEmail(email: string): Promise<UserDocument | null>;
}
