import mongoose, { Model } from 'mongoose';
import { Group, GroupDocument } from 'src/database/models/group.schema';
export declare class GroupService {
    private groupModel;
    constructor(groupModel: Model<GroupDocument>);
    createGroup(data: Partial<Group>): Promise<GroupDocument>;
    updateGroup(id: mongoose.Types.ObjectId, data: Partial<Group>): Promise<GroupDocument | null>;
    deleteGroup(id: mongoose.Types.ObjectId): Promise<GroupDocument | null>;
    findSingleGroupById(id: mongoose.Types.ObjectId): Promise<GroupDocument | null>;
    findSingleGroupByOwnerId(ownerId: mongoose.Types.ObjectId): Promise<GroupDocument | null>;
    findGroupsByOwnerId(ownerId: mongoose.Types.ObjectId): Promise<Group[]>;
    findGroupsByMemberId(memberId: mongoose.Types.ObjectId): Promise<Group[]>;
    addMemberToGroup(groupId: mongoose.Types.ObjectId, memberId: mongoose.Types.ObjectId): Promise<GroupDocument | null>;
    removeMemberFromGroup(groupId: mongoose.Types.ObjectId, memberId: mongoose.Types.ObjectId): Promise<GroupDocument | null>;
}
