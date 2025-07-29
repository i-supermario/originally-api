import { Module } from '@nestjs/common';
import { FirebaseModule } from '../firebase/firebase.module';
import { FirebaseAuthService } from './firebase-auth.service';

@Module({
  imports: [FirebaseModule],
  controllers: [],
  providers: [FirebaseAuthService],
  exports: [FirebaseAuthService],
})
export class FirebaseAuthModule {}
