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
exports.SessionService = void 0;
const common_1 = require("@nestjs/common");
const session_schema_1 = require("../database/models/session.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let SessionService = class SessionService {
    sessionModel;
    constructor(sessionModel) {
        this.sessionModel = sessionModel;
    }
    async createSession(userId) {
        return this.sessionModel.create({
            userId: userId,
            expiresAt: Date.now() + 24 * 60 * 60 * 1000,
            status: session_schema_1.SessionStatus.ACTIVE,
        });
    }
    async findActiveSessionBySessionId(sessionId) {
        return this.sessionModel.findOne({
            _id: sessionId,
            status: session_schema_1.SessionStatus.ACTIVE,
        });
    }
    async findActiveSessionByUserId(userId) {
        return this.sessionModel.findOne({
            userId: userId,
            status: session_schema_1.SessionStatus.ACTIVE,
        });
    }
    async extendSessionTimeBy(sessionId, duration = 24 * 60 * 60 * 1000) {
        return this.sessionModel.findOneAndUpdate({
            _id: sessionId,
        }, {
            expiresAt: Date.now() + duration,
        });
    }
    async closeActiveSession(sessionId) {
        return this.sessionModel.findOneAndUpdate({
            _id: sessionId,
        }, {
            status: session_schema_1.SessionStatus.INACTIVE,
        });
    }
};
exports.SessionService = SessionService;
exports.SessionService = SessionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(session_schema_1.Session.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SessionService);
//# sourceMappingURL=session.service.js.map