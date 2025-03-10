import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FirebaseAuthModule } from 'src/lib/firebase-auth/firebase-auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SessionModule } from 'src/session/session.module';

@Module({
  imports: [FirebaseAuthModule, PrismaModule, SessionModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
