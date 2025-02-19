import { Module } from '@nestjs/common';
import { FirebaseModule } from '../firebase/firebase.module';
import { FirebaseAuthController } from './firebase-auth.controller';
import { FirebaseAuthService } from './firebase-auth.service';

@Module({
  imports: [FirebaseModule],
  controllers: [FirebaseAuthController],
  providers: [FirebaseAuthService],
})
export class FirebaseAuthModule {}
