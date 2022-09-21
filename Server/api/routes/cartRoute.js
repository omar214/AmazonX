import express from 'express';
const router = express.Router();
import cartController from '../controllers/cartController.js';
import { verifyAuth } from '../../middlewares/authMiddleware.js';

router.use(verifyAuth);

router.get('/', cartController.getUserCart);

router.post('/', cartController.addToCart);

router.post('/checkout', cartController.checkout);

router.delete('/', cartController.deleteCart);
router.patch('/', cartController.deleteItem);

export default router;
