declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'test' | 'production';
      PORT: number;
      LINKEDIN_EMAIL: string;
      LINKEDIN_PASSWORD: string;
      PROD_HOST: string;
    }
  }
}
export {};
