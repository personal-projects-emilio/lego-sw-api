import { Router } from 'express';
import { createMinifig, deleteMinifig, getMinifig, getMinifigs, partialUpdateMinifig, updateMinifig } from 'controllers/minifigs';
import advancedResults from 'middleware/advancedResults';
import Minifig from 'models/Minifig';

/**
 * Router for minifigs
 * @route /minifigs
 */
const router = Router();

router.route('/')
  .get(advancedResults(Minifig), getMinifigs)
  .post(createMinifig);

router.route('/:id')
  .get(getMinifig)
  .delete(deleteMinifig)
  .put(updateMinifig)
  .patch(partialUpdateMinifig);

export default router;