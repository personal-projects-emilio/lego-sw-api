import { Express } from 'express';
import auth from './auth';
import minifigs from './minifigs';
import users from './users';

/**
 * Mount the routers
 * @param  {Express} app
 * @Route /api/v1/auth
 * @Route /api/v1/minifigs
 * @Route /api/v1/users
 */
const mountRouters = (app: Express) => {
  app.use('/api/v1/auth', auth)
  app.use('/api/v1/minifigs', minifigs);
  app.use('/api/v1/users', users)
}

export default mountRouters;