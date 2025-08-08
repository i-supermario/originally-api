import { FirebaseService } from '../firebase/firebase.service';
export declare class FirebaseAuthService {
    private readonly firebaseService;
    private auth;
    constructor(firebaseService: FirebaseService);
    verifyToken(token: string): Promise<{
        isVerified: boolean;
        uid?: undefined;
        email?: undefined;
    } | {
        uid: string;
        email: string | undefined;
        isVerified: boolean;
    }>;
}
