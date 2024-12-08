import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { deleteReview, getReviews, postReview } from "../controllers/review.controller.js";


const router = express.Router();

router.route("/post").post(isAuthenticated, postReview);
router.route("/get").get(getReviews);
router.route("/delete/:id").delete(isAuthenticated, deleteReview);

export default router;
