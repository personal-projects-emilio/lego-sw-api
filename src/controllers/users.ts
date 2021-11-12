import asyncHandler from "middleware/asyncHandler";
import User from "models/User";
import ErrorResponse from "utils/errorResponse";

/**
 * Get all users
 * @route GET /api/v1/users
 * @access Private/Admin
 */
export const getUsers = asyncHandler(async (_req, res, _next) => {
  res.status(200).json(res.advancedResults);
});

/**
 * Get a single user
 * @route GET /api/v1/users/:id
 * @access Private/Admin
 */
export const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(404, `User not found with id of ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

/**
 * Create an user
 * @route POST /api/v1/users
 * @access Private/Admin
 */
export const createUser = asyncHandler(async (req, res, _next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    data: user,
  });
});

/**
 * Update an user
 * @route PUT /api/v1/users
 * @access Private/Admin
 */
export const updateUser = asyncHandler(async (req, res, next) => {
  let user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(404, `User not found with id of ${req.params.id}`)
    );
  }

  user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    overwrite: true,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc      Delete user
// @route     DELETE /api/v1/users/:id
// @access    Private/Admin
export const deleteUser = asyncHandler(async (req, res, _next) => {
  await User.findByIdAndDelete(req.params.id);

  res.sendStatus(204);
});
