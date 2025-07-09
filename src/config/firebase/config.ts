export interface IFirebaseConfig {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
  universe_domain: string;
}

export default (): { firebase: IFirebaseConfig } => ({
  firebase: {
    type: process.env.TYPE || '',
    project_id: process.env.PROJECT_ID || '',
    private_key_id: process.env.PRIVATE_KEY_ID || '',
    private_key: process.env.PRIVATE_KEY || '',
    client_email: process.env.CLIENT_EMAIL || '',
    client_id: process.env.CLIENT_ID || '',
    auth_uri: process.env.AUTH_URI || '',
    token_uri: process.env.TOKEN_URI || '',
    auth_provider_x509_cert_url: process.env.AUTH_CERT_URL || '',
    client_x509_cert_url: process.env.CLIENT_CERT_URL || '',
    universe_domain: process.env.UNIVERSAL_DOMAIN || '',
  },
});

export const DATABASE_URL =
  process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/no-cap';
