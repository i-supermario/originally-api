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
exports.SessionController = void 0;
const common_1 = require("@nestjs/common");
const session_service_1 = require("./session.service");
const user_service_1 = require("../user/user.service");
let SessionController = class SessionController {
    sessionService;
    userService;
    constructor(sessionService, userService) {
        this.sessionService = sessionService;
        this.userService = userService;
    }
    async getUserSessionInfo(request, response) {
        const sessionId = request.cookies['sessionId'];
        if (!sessionId) {
            return response.status(401).send({
                message: 'Session id not found',
            });
        }
        const sessionInfo = await this.sessionService.findActiveSessionBySessionId(sessionId);
        if (!sessionInfo) {
            return response.status(401).send({
                message: 'session info not found',
            });
        }
        const userInfo = await this.userService.findUserById(sessionInfo.userId);
        if (userInfo) {
            return response.status(200).send({
                userId: sessionInfo.userId,
                email: userInfo?.email,
                sessionId: sessionId,
            });
        }
        return response.status(401).send({
            message: 'session info not found',
        });
    }
};
exports.SessionController = SessionController;
__decorate([
    (0, common_1.Get)('/user-info'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "getUserSessionInfo", null);
exports.SessionController = SessionController = __decorate([
    (0, common_1.Controller)('/session'),
    __metadata("design:paramtypes", [session_service_1.SessionService,
        user_service_1.UserService])
], SessionController);
//# sourceMappingURL=session.controller.js.map