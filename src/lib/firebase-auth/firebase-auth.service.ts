import { Inject, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import actionCodeSettings from 'src/config/firebase/auth/actionCodeSettings';

@Injectable()
export class FirebaseAuthService {
  private auth: admin.auth.Auth;

  constructor(
    @Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App,
  ) {
    this.auth = firebaseAdmin.auth();
  }

  async sendSignInLinkToEmail(email: string) {
    const settings = actionCodeSettings();
    await this.auth.generateSignInWithEmailLink(email, settings);
    return;
  }

  async verifyToken(token: string) {
    const decodedToken = await this.auth.verifyIdToken(token);
    if (!decodedToken.email_verified) return;
    return { uid: decodedToken.uid, email: decodedToken.email };
  }
}
