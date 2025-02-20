import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import actionCodeSettings from '../../config/firebase/auth/actionCodeSettings';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class FirebaseAuthService {
  private auth: admin.auth.Auth;

  constructor(private readonly firebaseService: FirebaseService) {
    this.auth = firebaseService.getAdmin().auth();
  }

  async sendSignInLinkToEmail(email: string) {
    const settings = actionCodeSettings();
    return await this.auth.generateSignInWithEmailLink(email, settings);
  }

  async verifyToken(token: string) {
    const decodedToken = await this.auth.verifyIdToken(token);
    if (!decodedToken.email_verified) return;
    return { uid: decodedToken.uid, email: decodedToken.email };
  }
}
