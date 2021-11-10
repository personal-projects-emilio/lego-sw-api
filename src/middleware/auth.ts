import { JWTToken } from "interfaces/auth";
import { NextFunction, Response, Request } from 'express';
import asyncHandler from "./asyncHandler";
import ErrorResponse from "utils/errorResponse";
import jwt from 'jsonwebtoken';
import User from "models/User";

// Protect routes
export const protect = asyncHandler(async (req, _res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {  // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
  } // Set token from cookie
  else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return next(new ErrorResponse(401, 'Not authorized to access this route'));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JWTToken;
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return next(new ErrorResponse(401, 'Not authorized to access this route'));
  }
});

// Grant access to specific roles
export const authorize = (...roles: string[]) =>
  (req: Request, _res: Response, next: NextFunction) => {
    if (req.user && !roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          403,
          `User role '${req.user.role}' is not authorized to access this route`,
        )
      );
    }
    next();
  };
