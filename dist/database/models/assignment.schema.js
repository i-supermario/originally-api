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
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignmentSchema = exports.Assignment = exports.Task = exports.TaskStatus = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
var TaskStatus;
(function (TaskStatus) {
    TaskStatus["ACTIVE"] = "ACTIVE";
    TaskStatus["PROGRESSING"] = "PROGRESSING";
    TaskStatus["FINISHED"] = "FINISHED";
})(TaskStatus || (exports.TaskStatus = TaskStatus = {}));
let Task = class Task {
    name;
    description;
    status;
    latitude;
    longitude;
};
exports.Task = Task;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Task.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Task.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: TaskStatus, default: TaskStatus.ACTIVE }),
    __metadata("design:type", String)
], Task.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Task.prototype, "latitude", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Task.prototype, "longitude", void 0);
exports.Task = Task = __decorate([
    (0, mongoose_1.Schema)({
        _id: true,
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    })
], Task);
const taskSchema = mongoose_1.SchemaFactory.createForClass(Task);
let Assignment = class Assignment {
    ownerId;
    assigneeId;
    name;
    description;
    tasks;
    dueDate;
};
exports.Assignment = Assignment;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", mongoose_2.default.Types.ObjectId)
], Assignment.prototype, "ownerId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", mongoose_2.default.Types.ObjectId)
], Assignment.prototype, "assigneeId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Assignment.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Assignment.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [taskSchema], default: [] }),
    __metadata("design:type", Array)
], Assignment.prototype, "tasks", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Assignment.prototype, "dueDate", void 0);
exports.Assignment = Assignment = __decorate([
    (0, mongoose_1.Schema)({
        _id: true,
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    })
], Assignment);
exports.assignmentSchema = mongoose_1.SchemaFactory.createForClass(Assignment);
//# sourceMappingURL=assignment.schema.js.map