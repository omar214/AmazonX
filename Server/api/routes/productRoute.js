import express from 'express';
const router = express.Router();
import productController from '../controllers/productController.js';
import { verifyAuth, verifyAdmin } from '../../middlewares/authMiddleware.js';


router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

router.post('/', verifyAuth, verifyAdmin, productController.addProduct);
router.delete('/:id', verifyAuth, verifyAdmin, productController.deleteProduct);
router.put('/:id', verifyAuth, verifyAdmin, productController.editProduct);

export default router;
