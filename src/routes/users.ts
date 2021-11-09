import { Router } from 'express';
import { getUsers, createUser, getUser, updateUser, deleteUser } from 'controllers/users';
import advancedResults from 'middleware/advancedResults';
import User from 'models/User';
// import {protect, authorize} from 'middleware/auth';

/**
 * Router for users
 * @route /users
 */
const router = Router();

// router.use(protect);
// router.use(authorize('admin'));


router
  .route('/')
  .get(advancedResults(User), getUsers)
  .post(createUser);

router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);


export default router;