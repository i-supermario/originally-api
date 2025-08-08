import { GroupService } from './group.service';
import { UserService } from 'src/user/user.service';
import { createGroupDto } from './dto/createGroup.dto';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { addOrRemoveMemberDto } from './dto/addOrRemoveMember.dto';
import { GroupWithMembers } from 'src/common/types/group';
export declare class GroupController {
    private groupService;
    private userService;
    constructor(groupService: GroupService, userService: UserService);
    createNewGroup(request: Request, response: Response, data: createGroupDto): Promise<{
        message: string;
    }>;
    getGroupDetails(request: Request, response: Response, groupId: mongoose.Types.ObjectId): Promise<{
        message: string;
    } | {
        ownerDetails: (mongoose.Document<unknown, {}, import("../database/models/user.schema").User, {}> & import("../database/models/user.schema").User & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        }) | null;
        memberDetails: (mongoose.Document<unknown, {}, import("../database/models/user.schema").User, {}> & import("../database/models/user.schema").User & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        })[];
        _id: mongoose.Types.ObjectId;
        $locals: Record<string, unknown>;
        $op: "save" | "validate" | "remove" | null;
        $where: Record<string, unknown>;
        baseModelName?: string;
        collection: mongoose.Collection;
        db: mongoose.Connection;
        errors?: mongoose.Error.ValidationError;
        id?: any;
        isNew: boolean;
        schema: mongoose.Schema;
        ownerId: mongoose.Types.ObjectId;
        name: string;
        description: string;
        memberIds: mongoose.Types.ObjectId[];
        status: import("../database/models/group.schema").GroupStatus;
        __v: number;
        message?: undefined;
    }>;
    addMemberToGroup(request: Request, response: Response, groupId: mongoose.Types.ObjectId, data: addOrRemoveMemberDto): Promise<{
        message: string;
        error?: undefined;
    } | {
        message: string;
        error: any;
    }>;
    removeMemberFromGroup(request: Request, response: Response, groupId: mongoose.Types.ObjectId, memberId: mongoose.Types.ObjectId): Promise<{
        message: string;
        error?: undefined;
    } | {
        message: string;
        error: any;
    }>;
    getAllGroupsForUser(request: Request, response: Response, userId: mongoose.Types.ObjectId): Promise<{
        data: GroupWithMembers[];
    }>;
}
