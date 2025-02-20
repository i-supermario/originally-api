import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma/prisma.service';
import { FirebaseAuthModule } from 'src/lib/firebase-auth/firebase-auth.module';

@Module({
  imports: [FirebaseAuthModule],
  providers: [UserService, PrismaService],
  controllers: [UserController],
})
export class UserModule {}
