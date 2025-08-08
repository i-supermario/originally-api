"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignmentModule = void 0;
const common_1 = require("@nestjs/common");
const assignment_service_1 = require("./assignment.service");
const assignment_controller_1 = require("./assignment.controller");
const user_module_1 = require("../user/user.module");
const session_module_1 = require("../session/session.module");
const mongoose_1 = require("@nestjs/mongoose");
const assignment_schema_1 = require("../database/models/assignment.schema");
let AssignmentModule = class AssignmentModule {
};
exports.AssignmentModule = AssignmentModule;
exports.AssignmentModule = AssignmentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            session_module_1.SessionModule,
            mongoose_1.MongooseModule.forFeature([
                { name: assignment_schema_1.Assignment.name, schema: assignment_schema_1.assignmentSchema },
            ]),
        ],
        providers: [assignment_service_1.AssignmentService],
        controllers: [assignment_controller_1.AssignmentController],
    })
], AssignmentModule);
//# sourceMappingURL=assignment.module.js.map