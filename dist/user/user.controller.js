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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const SignUpUser_dto_1 = require("./dto/SignUpUser.dto");
const firebase_auth_service_1 = require("../lib/firebase-auth/firebase-auth.service");
const LoginUser_dto_1 = require("./dto/LoginUser.dto");
const session_service_1 = require("../session/session.service");
const LogoutUser_dto_1 = require("./dto/LogoutUser.dto");
let UserController = class UserController {
    sessionService;
    userService;
    firebaseAuthService;
    constructor(sessionService, userService, firebaseAuthService) {
        this.sessionService = sessionService;
        this.userService = userService;
        this.firebaseAuthService = firebaseAuthService;
    }
    async signUpUser(request, response, userData) {
        const { password, token, ...user } = userData;
        const res = await this.userService.createUser(user);
        if (!res) {
            return response.status(401).send({
                message: 'User could not be created',
            });
        }
        const session = await this.sessionService.createSession(res._id);
        response.cookie('sessionId', session.id, {
            expires: session.expiresAt,
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
        });
        return response.status(200).send({
            message: 'User created successfully',
            sessionId: session._id.toString(),
            email: user.email,
            userId: res._id,
        });
    }
    async loginUser(request, response, body) {
        const user = await this.userService.findUserByEmail(body.email);
        if (!user) {
            return response.status(401).send({ message: 'User not found' });
        }
        const oldSession = await this.sessionService.findActiveSessionByUserId(user._id);
        if (oldSession && oldSession.expiresAt.getDate() > Date.now()) {
            response.cookie('sessionId', oldSession.id, {
                expires: oldSession.expiresAt,
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
            });
            return response.status(200).send({
                message: 'User logged in successfully',
                sessionId: oldSession._id.toString(),
                email: user.email,
                userId: user._id.toString(),
            });
        }
        const newSession = await this.sessionService.createSession(user._id);
        if (newSession) {
            response.cookie('sessionId', newSession.id, {
                expires: newSession.expiresAt,
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
            });
            return response.status(200).send({
                message: 'User logged in successfully',
                sessionId: newSession._id.toString(),
                email: user.email,
                userId: user._id.toString(),
            });
        }
        else {
            return response
                .status(400)
                .send({ message: 'Session could not be created' });
        }
    }
    async logoutUser(request, response, body) {
        const user = await this.userService.findUserByEmail(body.email);
        if (!user) {
            return response.status(400).send({
                message: 'User not found',
            });
        }
        const session = await this.sessionService.findActiveSessionByUserId(user._id);
        if (!session) {
            return response.status(400).send({
                message: 'session not found',
            });
        }
        response.cookie('sessionId', '', {
            expires: new Date(),
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
        });
        await this.sessionService.closeActiveSession(session._id);
        return response.status(200).send({
            message: 'User logged out successfully',
        });
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('/sign-up'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, SignUpUser_dto_1.SignUpUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signUpUser", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({
        passthrough: true,
    })),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, LoginUser_dto_1.LoginUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "loginUser", null);
__decorate([
    (0, common_1.Post)('/logout'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, LogoutUser_dto_1.LogoutUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "logoutUser", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('/user'),
    __metadata("design:paramtypes", [session_service_1.SessionService,
        user_service_1.UserService,
        firebase_auth_service_1.FirebaseAuthService])
], UserController);
//# sourceMappingURL=user.controller.js.map