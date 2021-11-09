import asyncHandler from "middleware/asyncHandler";
import User from "models/User";
import ErrorResponse from "utils/errorResponse";
import { CookieOptions, Response } from 'express';



/**
 * Login user
 * @route GET /api/v1/auth/login
 * @access Public
 */
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate emil & password
  if (!email || !password) {
    return next(new ErrorResponse(400, 'Please provide an email and password'));
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse(401, 'Invalid credentials'));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse(401, 'Invalid credentials'));
  }

  sendTokenResponse(user, 200, res);
});

/**
 * Log user out and clear cookie
 * @route GET /api/v1/auth/logout
 * @access Public
 */
export const logout = asyncHandler(async (_req, res, _next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
});


/**
 * Get token from model, create cookie and send response
 * @param  {ITUserModel} user
 * @param  {number} statusCode
 * @param  {Response} res
 */
export const sendTokenResponse = (user: ITUserModel, statusCode: number, res: Response) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options: CookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
  });
};
