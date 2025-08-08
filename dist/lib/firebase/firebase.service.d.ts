import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
export declare class FirebaseService {
    private configService;
    private firebaseAdmin;
    constructor(configService: ConfigService);
    getAdmin(): admin.app.App;
}
