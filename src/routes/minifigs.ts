import { Router } from "express";
import {
  createMinifig,
  deleteMinifig,
  getMinifig,
  getMinifigs,
  partialUpdateMinifig,
  updateMinifig,
} from "controllers/minifigs";
import { protect, authorize } from "middleware/auth";
import advancedResults from "middleware/advancedResults";
import Minifig from "models/Minifig";

/**
 * Router for minifigs
 * @route /minifigs
 */
const router = Router();

router
  .route("/")
  .get(advancedResults(Minifig), getMinifigs)
  .post(protect, authorize("admin"), createMinifig);

router
  .route("/:id")
  .get(getMinifig)
  .delete(protect, authorize("admin"), deleteMinifig)
  .put(protect, authorize("admin"), updateMinifig)
  .patch(protect, authorize("admin"), partialUpdateMinifig);

export default router;
