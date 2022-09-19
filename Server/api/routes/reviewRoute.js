import express from 'express';
const router = express.Router();
import reviewController from '../controllers/reviewController.js';
import { verifyAuth, verifyAdmin } from '../../middlewares/authMiddleware.js';

router.post('/:id', verifyAuth, reviewController.addReview);
router.get('/:id', reviewController.getProductReviews);
router.delete('/:id', verifyAuth, verifyAdmin, reviewController.deleteReview);

export default router;
