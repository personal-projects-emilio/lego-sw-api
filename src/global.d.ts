declare module 'xss-clean';

namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    PORT: string;
    MONGO_URI: string;
    JWT_SECRET: string;
    JWT_EXPIRE: string;
    JWT_COOKIE_EXPIRE: number;
  }
}

namespace Express {
  interface Response {
    advancedResults?: {
      success: boolean,
      pagination: Pagination,
      data: any[]
    }
  }

  interface Request {
    user?: ITUserModel | null;
  }
}
