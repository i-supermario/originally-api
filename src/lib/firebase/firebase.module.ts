import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { IFirebaseConfig } from 'src/config/firebase/config';

@Module({
  providers: [
    {
      provide: 'FIREBASE-ADMIN',
      useFactory: (configService: ConfigService) => {
        return admin.initializeApp({
          credential: admin.credential.cert(
            configService.get<IFirebaseConfig>(
              'firebase',
            ) as admin.ServiceAccount,
          ),
        });
      },
    },
  ],
  exports: ['FIREBASE_ADMIN'],
})
export class FirebaseModule { }
