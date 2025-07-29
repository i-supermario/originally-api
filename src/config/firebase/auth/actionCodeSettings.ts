import * as admin from 'firebase-admin';

export default (): admin.auth.ActionCodeSettings => ({
  url: process.env.FIREBASE_AUTH_URL || '',
  handleCodeInApp: true,
});
