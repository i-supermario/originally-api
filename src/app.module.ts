import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { FirebaseAuthModule } from './lib/firebase-auth/firebase-auth.module';
import { FirebaseModule } from './lib/firebase/firebase.module';
import { SessionModule } from './session/session.module';
import { GroupModule } from './group/group.module';
import firebaseConfig, { DATABASE_URL } from './config/firebase/config';
import { RedisService } from './redis/redis.service';
import { RedisModule } from './redis/redis.module';
import { LocationModule } from './location/location.module';
import { TaskModule } from './assignment/assignment.module';
import { TaskService } from './task/task.service';

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true, load: [firebaseConfig] }),
    UserModule,
    FirebaseAuthModule,
    FirebaseModule,
    SessionModule,
    GroupModule,
    MongooseModule.forRoot(DATABASE_URL),
    RedisModule,
    LocationModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService, RedisService, TaskService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('user', 'group', 'session')
      .apply();
  }
}
