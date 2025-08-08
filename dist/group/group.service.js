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
exports.GroupService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const group_schema_1 = require("../database/models/group.schema");
let GroupService = class GroupService {
    groupModel;
    constructor(groupModel) {
        this.groupModel = groupModel;
    }
    async createGroup(data) {
        return this.groupModel.create({
            ...data,
            ownerId: new mongoose_2.default.Types.ObjectId(data.ownerId),
            status: group_schema_1.GroupStatus.ACTIVE,
            memberIds: [...(data.memberIds || [])],
        });
    }
    async updateGroup(id, data) {
        return this.groupModel.findOneAndUpdate({ _id: id }, {
            ...data,
        });
    }
    async deleteGroup(id) {
        return this.groupModel.findOneAndDelete({
            _id: id,
        });
    }
    async findSingleGroupById(id) {
        return this.groupModel
            .findOne({
            _id: id,
        })
            .lean();
    }
    async findSingleGroupByOwnerId(ownerId) {
        return this.groupModel
            .findOne({
            ownerId: ownerId,
        })
            .lean();
    }
    async findGroupsByOwnerId(ownerId) {
        return this.groupModel
            .find({
            ownerId: new mongoose_2.default.Types.ObjectId(ownerId),
        })
            .lean();
    }
    async findGroupsByMemberId(memberId) {
        return this.groupModel
            .find({
            memberIds: { $in: new mongoose_2.default.Types.ObjectId(memberId) },
        })
            .lean();
    }
    async addMemberToGroup(groupId, memberId) {
        return this.groupModel.findByIdAndUpdate(groupId, {
            $addToSet: { memberIds: memberId },
        });
    }
    async removeMemberFromGroup(groupId, memberId) {
        return this.groupModel.findByIdAndUpdate(groupId, {
            $pull: { memberIds: new mongoose_2.default.Types.ObjectId(memberId) },
        });
    }
};
exports.GroupService = GroupService;
exports.GroupService = GroupService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(group_schema_1.Group.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], GroupService);
//# sourceMappingURL=group.service.js.map