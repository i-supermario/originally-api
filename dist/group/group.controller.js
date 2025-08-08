"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupController = void 0;
const common_1 = require("@nestjs/common");
const group_service_1 = require("./group.service");
const user_service_1 = require("../user/user.service");
const createGroup_dto_1 = require("./dto/createGroup.dto");
const auth_guard_1 = require("../guards/auth.guard");
const mongoose_1 = require("mongoose");
const addOrRemoveMember_dto_1 = require("./dto/addOrRemoveMember.dto");
let GroupController = class GroupController {
    groupService;
    userService;
    constructor(groupService, userService) {
        this.groupService = groupService;
        this.userService = userService;
    }
    async createNewGroup(request, response, data) {
        try {
            await this.groupService.createGroup({ ...data });
            response.status(200);
            return { message: 'Group created successfully' };
        }
        catch (error) {
            response.status(400);
            return { message: 'Could not create group' };
        }
    }
    async getGroupDetails(request, response, groupId) {
        const group = await this.groupService.findSingleGroupById(groupId);
        if (!group) {
            response.status(400);
            return { message: 'Group not found' };
        }
        group.memberIds.push(group.ownerId);
        const memberDetails = (await Promise.all(group.memberIds.map((id) => this.userService.findUserById(id)))).filter((user) => !!user);
        const ownerDetails = await this.userService.findUserById(group.ownerId);
        response.status(200);
        return {
            ...group,
            ownerDetails,
            memberDetails,
        };
    }
    async addMemberToGroup(request, response, groupId, data) {
        try {
            const group = await this.groupService.findSingleGroupById(groupId);
            if (!group) {
                response.status(400);
                return { message: 'Group not found' };
            }
            const member = await this.userService.findUserByEmail(data.email);
            if (!member) {
                response.status(400);
                return { message: `Member with email ${data.email} not found` };
            }
            if (group?.memberIds.includes(member._id))
                response.status(200).send({ message: 'Member already in group' });
            await this.groupService.addMemberToGroup(groupId, member._id);
            response.status(200);
            return { message: 'Member added to group' };
        }
        catch (error) {
            response.status(400);
            return { message: 'Could not add member to group', error: error };
        }
    }
    async removeMemberFromGroup(request, response, groupId, memberId) {
        try {
            const group = await this.groupService.findSingleGroupById(groupId);
            if (!group) {
                response.status(400);
                return { message: 'Group not found' };
            }
            if (!group?.memberIds.includes(memberId)) {
                response.status(200);
                return { message: 'Member removed from group' };
            }
            await this.groupService.removeMemberFromGroup(groupId, memberId);
            response.status(200);
            return { message: 'Member removed from group' };
        }
        catch (error) {
            response.status(400);
            return { message: 'Could not remove from group', error: error };
        }
    }
    async getAllGroupsForUser(request, response, userId) {
        try {
            const ownedGroups = (await this.groupService.findGroupsByOwnerId(userId)) || [];
            const memberGroups = (await this.groupService.findGroupsByMemberId(userId)) || [];
            const allGroups = [...ownedGroups, ...memberGroups];
            const completeGroupDetails = [];
            for (const group of allGroups) {
                group.memberIds.push(group.ownerId);
                const memberDetails = (await Promise.all(group.memberIds.map((id) => this.userService.findUserById(id)))).filter((user) => !!user);
                const ownerDetails = await this.userService.findUserById(group.ownerId);
                if (!ownerDetails)
                    continue;
                completeGroupDetails.push({
                    ...group,
                    ownerDetails,
                    memberDetails,
                });
            }
            response.status(200);
            return { data: completeGroupDetails };
        }
        catch (error) {
            response.status(400);
            return { data: [] };
        }
    }
};
exports.GroupController = GroupController;
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, createGroup_dto_1.createGroupDto]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "createNewGroup", null);
__decorate([
    (0, common_1.Get)('/:groupId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __param(2, (0, common_1.Param)('groupId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, mongoose_1.default.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "getGroupDetails", null);
__decorate([
    (0, common_1.Post)('/:groupId/add-member'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __param(2, (0, common_1.Param)('groupId')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, mongoose_1.default.Types.ObjectId, addOrRemoveMember_dto_1.addOrRemoveMemberDto]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "addMemberToGroup", null);
__decorate([
    (0, common_1.Delete)('/:groupId/remove-member/:memberId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __param(2, (0, common_1.Param)('groupId')),
    __param(3, (0, common_1.Param)('memberId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, mongoose_1.default.Types.ObjectId, mongoose_1.default.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "removeMemberFromGroup", null);
__decorate([
    (0, common_1.Get)('/get-all/:userId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __param(2, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, mongoose_1.default.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "getAllGroupsForUser", null);
exports.GroupController = GroupController = __decorate([
    (0, common_1.Controller)('/group'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [group_service_1.GroupService,
        user_service_1.UserService])
], GroupController);
//# sourceMappingURL=group.controller.js.map