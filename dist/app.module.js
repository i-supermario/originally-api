"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const user_module_1 = require("./user/user.module");
const logger_middleware_1 = require("./middleware/logger.middleware");
const firebase_auth_module_1 = require("./lib/firebase-auth/firebase-auth.module");
const firebase_module_1 = require("./lib/firebase/firebase.module");
const session_module_1 = require("./session/session.module");
const group_module_1 = require("./group/group.module");
const config_2 = require("./config/firebase/config");
const assignment_module_1 = require("./assignment/assignment.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(logger_middleware_1.LoggerMiddleware)
            .forRoutes('user', 'group', 'session', 'assignment')
            .apply();
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ cache: true, load: [config_2.default] }),
            user_module_1.UserModule,
            firebase_auth_module_1.FirebaseAuthModule,
            firebase_module_1.FirebaseModule,
            session_module_1.SessionModule,
            group_module_1.GroupModule,
            mongoose_1.MongooseModule.forRoot(config_2.DATABASE_URL),
            assignment_module_1.AssignmentModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map