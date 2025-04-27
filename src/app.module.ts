import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { FirebaseAuthModule } from './lib/firebase-auth/firebase-auth.module';
import { FirebaseModule } from './lib/firebase/firebase.module';
import { SessionService } from './session/session.service';
import { SessionModule } from './session/session.module';
import firebaseConfig from './config/firebase/config';

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true, load: [firebaseConfig] }),
    PrismaModule,
    UserModule,
    FirebaseAuthModule,
    FirebaseModule,
    SessionModule,
  ],
  controllers: [AppController],
  providers: [AppService, SessionService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('user').apply();
  }
}
