import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class FirebaseAuthService {
  private auth: admin.auth.Auth;

  constructor(private readonly firebaseService: FirebaseService) {
    this.auth = firebaseService.getAdmin().auth();
  }

  async verifyToken(token: string) {
    const decodedToken = await this.auth.verifyIdToken(token);
    if (!decodedToken.email_verified) return { isVerified: false };
    return {
      uid: decodedToken.uid,
      email: decodedToken.email,
      isVerified: true,
    };
  }
}
