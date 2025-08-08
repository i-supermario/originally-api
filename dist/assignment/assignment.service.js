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
exports.AssignmentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const assignment_schema_1 = require("../database/models/assignment.schema");
let AssignmentService = class AssignmentService {
    assignmentModel;
    constructor(assignmentModel) {
        this.assignmentModel = assignmentModel;
    }
    async createAssignment(data) {
        const assignment = await this.assignmentModel.create({
            ...data,
            ownerId: new mongoose_2.default.Types.ObjectId(data.ownerId),
            tasks: data.tasks || [],
        });
        return assignment;
    }
    async deleteAssignmentById(id) {
        return await this.assignmentModel.findByIdAndDelete(id);
    }
    async findAssignmentById(id) {
        return await this.assignmentModel.findById(id);
    }
    async findAssignmentsByOwnerId(ownerId) {
        return ((await this.assignmentModel.find({
            ownerId: new mongoose_2.default.Types.ObjectId(ownerId),
        })) || []);
    }
    async findAssignmentByAssigneeId(assigneeId) {
        return ((await this.assignmentModel.find({
            assigneeId: new mongoose_2.default.Types.ObjectId(assigneeId),
        })) || []);
    }
    async findAssignmentDetailsById(id) {
        const assignmentDetails = await this.assignmentModel.aggregate([
            {
                $match: { _id: new mongoose_2.default.Types.ObjectId(id) },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'assigneeId',
                    foreignField: '_id',
                    as: 'assigneeDetails',
                },
            },
            {
                $unwind: {
                    path: '$assigneeDetails',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'ownerId',
                    foreignField: '_id',
                    as: 'ownerDetails',
                },
            },
            {
                $unwind: {
                    path: '$ownerDetails',
                    preserveNullAndEmptyArrays: true,
                },
            },
        ]);
        return assignmentDetails[0];
    }
    async addTaskToAssignment(assignmentId, task) {
        const assignment = this.assignmentModel.findByIdAndUpdate(assignmentId, {
            $addToSet: {
                tasks: task,
            },
        });
        return assignment;
    }
    async removeTaskFromAssignment(assignmentId, taskId) {
        return await this.assignmentModel.updateOne({ _id: assignmentId }, {
            $pull: {
                tasks: { _id: taskId },
            },
        });
    }
    async startTaskInAssignment(assignmentId, taskId) {
        return this.assignmentModel.updateOne({
            'tasks._id': taskId,
        }, [
            {
                $set: {
                    tasks: {
                        $map: {
                            input: '$tasks',
                            as: 'task',
                            in: {
                                $cond: [
                                    { $eq: ['$$task._id', taskId] },
                                    {
                                        $mergeObjects: [
                                            '$$task',
                                            { status: assignment_schema_1.TaskStatus.PROGRESSING },
                                        ],
                                    },
                                    '$$task',
                                ],
                            },
                        },
                    },
                },
            },
        ]);
    }
    async assignTaskTo(assignmentId, assigneeId) {
        return this.assignmentModel.findByIdAndUpdate(assignmentId, {
            assigneeId: assigneeId,
        });
    }
    async endTaskInAssignment(assignmentId, taskId) {
        return this.assignmentModel.updateOne({
            'tasks._id': taskId,
        }, [
            {
                $set: {
                    tasks: {
                        $map: {
                            input: '$tasks',
                            as: 'task',
                            in: {
                                $cond: [
                                    {
                                        $eq: ['$$task._id', new mongoose_2.default.Types.ObjectId(taskId)],
                                    },
                                    {
                                        $mergeObjects: [
                                            '$$task',
                                            { status: assignment_schema_1.TaskStatus.FINISHED },
                                        ],
                                    },
                                    '$$task',
                                ],
                            },
                        },
                    },
                },
            },
        ]);
    }
    async rearrangeTasks(assignmentId, orderedTaskIds) {
        const objectIds = orderedTaskIds.map((id) => new mongoose_2.default.Types.ObjectId(id));
        return await this.assignmentModel.updateOne({ _id: new mongoose_2.default.Types.ObjectId(assignmentId) }, [
            {
                $set: {
                    tasks: {
                        $map: {
                            input: objectIds,
                            as: 'tid',
                            in: {
                                $first: {
                                    $filter: {
                                        input: '$tasks',
                                        as: 't',
                                        cond: { $eq: ['$$t._id', '$$tid'] },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        ]);
    }
};
exports.AssignmentService = AssignmentService;
exports.AssignmentService = AssignmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(assignment_schema_1.Assignment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AssignmentService);
//# sourceMappingURL=assignment.service.js.map