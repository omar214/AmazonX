import express from 'express';
const router = express.Router();

import authRoute from './routes/authRoute.js';
import userRoute from './routes/userRoute.js';
import productRoute from './routes/productRoute.js';
import orderRoute from './routes/orderRoute.js';
import cartRoute from './routes/cartRoute.js';
import reviewRoute from './routes/reviewRoute.js';

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/products', productRoute);
router.use('/orders', orderRoute);
router.use('/cart', cartRoute);
router.use('/reviews', reviewRoute);

export default router;
