import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { IFirebaseConfig } from 'src/config/firebase/config';

@Injectable()
export class FirebaseService {
  private firebaseAdmin: admin.app.App;

  constructor(private configService: ConfigService) {
    const firebaseConfig = this.configService.get<IFirebaseConfig>(
      'firebase',
    ) as admin.ServiceAccount;
    this.firebaseAdmin = admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig),
    });
  }

  getAdmin(): admin.app.App {
    return this.firebaseAdmin;
  }
}
