import { Express } from 'express';
import minifigs from './minifigs';

/**
 * Mount the routers
 * @param  {Express} app
 */
const mountRouters = (app: Express) => {
  app.use('/api/v1/minifigs', minifigs);
}

export default mountRouters;