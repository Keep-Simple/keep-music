declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    REDIS_URL: string;
    PORT: string;
    SESSION_SECRET: string;
    CORS_ORIGIN: string;
    CORS_ORIGIN_2: string;
    CLOUDINARY_URL: string;
    CLOUDINARY_SECRET: string;
  }
}
