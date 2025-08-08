"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATABASE_URL = void 0;
exports.default = () => ({
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
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/no-cap';
//# sourceMappingURL=config.js.map