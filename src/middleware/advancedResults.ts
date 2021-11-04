import { Model } from "mongoose";
import { NextFunction, Response, Request } from 'express';

const advancedResults = (model: Model<any>, /*populate?: any*/) => async (req: Request, res: Response, next: NextFunction) => {
  let query: ReturnType<typeof model.find>;

  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit', 'withTagsAndCharacterNameStat'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // Finding resources
  query = model.find(JSON.parse(queryStr));

  // Select Fields
  if (typeof req.query.select === 'string') {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (typeof req.query.sort === 'string') {
    let sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort({ _id: 'asc' });
  }

  // Pagination
  const page = typeof req.query.page === 'string' && parseInt(req.query.page, 10) || 1;
  const limit = typeof req.query.limit === 'string' && parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments(JSON.parse(queryStr));

  query = query.skip(startIndex).limit(limit);

  // if (populate) {
  //   query = query.populate(populate);
  // }

  // Executing query
  const results = await query;

  // Pagination result
  const pagination: Pagination = {
    total,
    count: results.length
  };

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }

  res.advancedResults = {
    success: true,
    pagination,
    data: results
  };

  next();
}

export default advancedResults;