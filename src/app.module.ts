import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { SessionModule } from './session/session.module';
import { GroupModule } from './group/group.module';
import { AssignmentModule } from './assignment/assignment.module';
import { PingService } from './ping/ping.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV} || 'development'`,
    }),
    ScheduleModule.forRoot(),
    UserModule,
    SessionModule,
    GroupModule,
    MongooseModule.forRoot(
      process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/no-cap',
    ),
    AssignmentModule,
  ],
  controllers: [AppController],
  providers: [AppService, PingService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('user', 'group', 'session', 'assignment')
      .apply();
  }
}
