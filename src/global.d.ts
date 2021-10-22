namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    PORT: string;
    MONGO_URI: string;
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
}