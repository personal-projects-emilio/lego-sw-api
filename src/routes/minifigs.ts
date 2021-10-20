import { Router } from 'express';
import { createMinifig, deleteMinifig, getMinifig, getMinifigs, partialUpdateMinifig, updateMinifig } from 'controllers/minifigs';

/**
 * Router for minifigs
 * @route /minifigs
 */
const router = Router();

router.route('/').get(getMinifigs).post(createMinifig);

router.route('/:id').get(getMinifig).delete(deleteMinifig).put(updateMinifig).patch(partialUpdateMinifig);

export default router;