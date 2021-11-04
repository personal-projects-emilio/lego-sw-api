import Minifig from 'models/Minifig';
import asyncHandler from 'middleware/asyncHandler';
import ErrorResponse from 'utils/errorResponse';
import { getStatistics, getTagsAndCharacNames } from 'utils/minifigs';

/**
 * Get all minifigs
 * @route GET /api/v1/minifigs
 * @access Public
 */
export const getMinifigs = asyncHandler(async (req, res, _next) => {
  if (req.query.withTagsAndCharacterNameStat) {
    const minifigs = await Minifig.find();
    return res.status(200).json({
      ...res.advancedResults,
      data: {
        list: res.advancedResults?.data,
        ...getStatistics(minifigs),
        ...getTagsAndCharacNames(minifigs),
      }
    })
  }
  res.status(200).json(res.advancedResults);
})

/**
 * Get single minifig by id
 * @route GET /api/v1/minifigs/:id
 * @access Public
 */
export const getMinifig = asyncHandler(async (req, res, next) => {
  const existingMinifig = await Minifig.findById(req.params.id);
  if (!existingMinifig) {
    return next(new ErrorResponse(404, `Minifig not found with id of ${req.params.id}`));
  }
  res.status(200).json({
    success: true,
    data: existingMinifig
  })
})

/**
 * Create a new minifig
 * @route POST /api/v1/minifigs
 * @access Private
 */
export const createMinifig = asyncHandler(async (req, res, next) => {
  // Check for existing minifig
  const existingMinifig = await Minifig.findById(req.params.id);
  if (existingMinifig) {
    return next(new ErrorResponse(404, `Minifig with id of ${req.params.id} already exists`));
  }

  const { id, ...body } = req.body;
  const newMinifig = await Minifig.create({ ...body, _id: id });

  res.status(201).json({
    success: true,
    data: newMinifig
  });
});

/**
 * Update a minifig
 * @route PUT /api/v1/minifigs/:id
 * @access Private
 */
export const updateMinifig = asyncHandler(async (req, res, next) => {
  let minifig = await Minifig.findById(req.params.id);

  if (!minifig) {
    return next(
      new ErrorResponse(404, `Minifig not found with id of ${req.params.id}`)
    );
  }

  minifig = await Minifig.findByIdAndUpdate(req.params.id, { ...req.body, _id: req.params.id }, {
    new: true,
    runValidators: true,
    overwrite: true,
  });

  res.status(200).json({ success: true, data: minifig });
});

/**
 * Partial update of a minifig
 * @route PATCH /api/v1/minifigs/:id
 * @access Private
 */
export const partialUpdateMinifig = asyncHandler(async (req, res, next) => {
  let minifig = await Minifig.findById(req.params.id);

  if (!minifig) {
    return next(
      new ErrorResponse(404, `Minifig not found with id of ${req.params.id}`)
    );
  }

  minifig = await Minifig.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: minifig });
});

/**
 * Delete a minifig
 * @route DELETE /api/v1/minifigs/:id
 * @access Private
 */
export const deleteMinifig = asyncHandler(async (req, res, next) => {
  const minifig = await Minifig.findById(req.params.id);

  if (!minifig) {
    return next(
      new ErrorResponse(404, `Minifig not found with id of ${req.params.id}`)
    );
  }

  await minifig.remove();

  res.sendStatus(204);
});
