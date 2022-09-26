import express from 'express';
const router = express.Router();
import productController from '../controllers/productController.js';
import { verifyAuth, verifyAdmin } from '../../middlewares/authMiddleware.js';
import upload from '../../utils/upload.js';

router.get('/', productController.getAllProducts);
router.get('/search', productController.search);
router.get('/categories', productController.getCategories);
router.get('/:id', productController.getProductById);

// router.post('/upload', upload.single('image'), productController.addProduct);
router.post(
	'/',
	verifyAuth,
	verifyAdmin,
	upload.single('image'),
	productController.addProduct,
);
router.post('/', verifyAuth, verifyAdmin, productController.addProduct);
router.delete('/:id', verifyAuth, verifyAdmin, productController.deleteProduct);
router.put('/:id', verifyAuth, verifyAdmin, productController.editProduct);

export default router;
