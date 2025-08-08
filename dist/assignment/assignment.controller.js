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
exports.AssignmentController = void 0;
const common_1 = require("@nestjs/common");
const assignment_service_1 = require("./assignment.service");
const mongoose_1 = require("mongoose");
const createAssignment_dto_1 = require("./dto/createAssignment.dto");
const addTask_dto_1 = require("./dto/addTask.dto");
const user_service_1 = require("../user/user.service");
let AssignmentController = class AssignmentController {
    assignmentService;
    userService;
    constructor(assignmentService, userService) {
        this.assignmentService = assignmentService;
        this.userService = userService;
    }
    async createAssignment(request, response, body) {
        try {
            if (body.dueDate < new Date()) {
                response.status(400);
                return { message: "Due date should after today's date" };
            }
            await this.assignmentService.createAssignment(body);
            response.status(200);
            return { message: 'Task created successfully' };
        }
        catch (error) {
            console.error(error);
            response.status(400);
            return { message: 'Failed to create task' };
        }
    }
    async getAssignment(request, response, assignmentId) {
        try {
            const assignment = await this.assignmentService.findAssignmentDetailsById(assignmentId);
            if (!assignment) {
                response.status(200);
                return { message: 'Assignment not found' };
            }
            response.status(200);
            return {
                data: assignment,
            };
        }
        catch (error) {
            console.error(error);
            response.status(400);
            return { message: 'Failed to retrieve assignment' };
        }
    }
    async getAllAssignments(request, response, userId) {
        try {
            const ownedAssignments = await this.assignmentService.findAssignmentsByOwnerId(userId);
            const assignedAssignments = await this.assignmentService.findAssignmentByAssigneeId(userId);
            const assignments = [...ownedAssignments, ...assignedAssignments];
            console.log(assignments);
            const assignmentDetails = await Promise.all(assignments.map((_) => this.assignmentService.findAssignmentDetailsById(_._id)));
            response.status(200);
            return { data: assignmentDetails };
        }
        catch (error) {
            console.error(error);
            response.status(400);
            return { data: [] };
        }
    }
    async deleteAssignment(request, response, assignmentId) {
        try {
            await this.assignmentService.deleteAssignmentById(assignmentId);
            response.status(200);
            return { message: 'Assignment removed successfully' };
        }
        catch (error) {
            console.error(error);
            response.status(400);
            return { message: 'Failed to remove assignment' };
        }
    }
    async addTask(request, response, assignmentId, body) {
        try {
            await this.assignmentService.addTaskToAssignment(assignmentId, body);
            response.status(200);
            return { message: 'Task added successfully' };
        }
        catch (error) {
            response.status(400);
            console.error(error);
            return { message: 'Failed to add task' };
        }
    }
    async assignTaskTo(request, response, assignmentId, body) {
        try {
            const user = await this.userService.findUserByEmail(body.email);
            if (!user) {
                response.status(200);
                return { message: 'User with email does not exist' };
            }
            await this.assignmentService.assignTaskTo(assignmentId, user._id);
            response.status(200);
            return { message: 'Task assigned to user successfully' };
        }
        catch (error) {
            response.status(400);
            console.error(error);
            return { message: 'Failed to assign task' };
        }
    }
    async completeTask(request, response, assignmentId, taskId) {
        try {
            await this.assignmentService.endTaskInAssignment(assignmentId, taskId);
            response.status(200);
            return { message: 'Task marked as complete successfully' };
        }
        catch (error) {
            console.error(error);
            response.status(400);
            return { message: 'Failed to add task' };
        }
    }
    async reorderTasks(request, response, assignmentId, orderedTaskIds) {
        return this.assignmentService.rearrangeTasks(assignmentId, orderedTaskIds);
    }
};
exports.AssignmentController = AssignmentController;
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, createAssignment_dto_1.createAssignmentDto]),
    __metadata("design:returntype", Promise)
], AssignmentController.prototype, "createAssignment", null);
__decorate([
    (0, common_1.Get)('/:assignmentId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __param(2, (0, common_1.Param)('assignmentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, mongoose_1.default.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], AssignmentController.prototype, "getAssignment", null);
__decorate([
    (0, common_1.Get)('/get-all/:userId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __param(2, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, mongoose_1.default.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], AssignmentController.prototype, "getAllAssignments", null);
__decorate([
    (0, common_1.Delete)('/:assignmentId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __param(2, (0, common_1.Param)('assignmentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, mongoose_1.default.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], AssignmentController.prototype, "deleteAssignment", null);
__decorate([
    (0, common_1.Put)('/:assignmentId/add-task'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __param(2, (0, common_1.Param)('assignmentId')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, mongoose_1.default.Types.ObjectId, addTask_dto_1.addTaskDto]),
    __metadata("design:returntype", Promise)
], AssignmentController.prototype, "addTask", null);
__decorate([
    (0, common_1.Put)('/:assignmentId/assign-to'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __param(2, (0, common_1.Param)('assignmentId')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, mongoose_1.default.Types.ObjectId, Object]),
    __metadata("design:returntype", Promise)
], AssignmentController.prototype, "assignTaskTo", null);
__decorate([
    (0, common_1.Put)('/:assignmentId/task/:taskId/complete'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __param(2, (0, common_1.Param)('assignmentId')),
    __param(3, (0, common_1.Param)('taskId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, mongoose_1.default.Types.ObjectId, mongoose_1.default.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], AssignmentController.prototype, "completeTask", null);
__decorate([
    (0, common_1.Patch)('/:id/tasks/reorder'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __param(2, (0, common_1.Param)('id')),
    __param(3, (0, common_1.Body)('orderedTaskIds')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, mongoose_1.default.Types.ObjectId, Array]),
    __metadata("design:returntype", Promise)
], AssignmentController.prototype, "reorderTasks", null);
exports.AssignmentController = AssignmentController = __decorate([
    (0, common_1.Controller)('/assignment'),
    __metadata("design:paramtypes", [assignment_service_1.AssignmentService,
        user_service_1.UserService])
], AssignmentController);
//# sourceMappingURL=assignment.controller.js.map