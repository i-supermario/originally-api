import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FirebaseAuthModule } from 'src/lib/firebase-auth/firebase-auth.module';
import { SessionModule } from 'src/session/session.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/database/models/user.schema';

@Module({
  imports: [
    SessionModule,
    FirebaseAuthModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  exports: [UserService],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
