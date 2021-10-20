import { NextFunction, RequestHandler, Response, Request } from 'express';

/**
 * Catches errors and passes them to the next callback
 * @param handler Async express request handler/middleware potentially throwing errors
 * @returns Async express request handler with error handling
 */
const asyncHandler = (handler: RequestHandler) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(handler(req, res, next)).catch(next);

export default asyncHandler;
