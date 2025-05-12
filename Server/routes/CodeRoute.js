import { Router } from 'express';
import { getReview } from "../controllers/CodeController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = Router();

router.route("/review-code").post(isAuthenticated, getReview);

export default router;    