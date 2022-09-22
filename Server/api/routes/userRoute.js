import express from 'express';
const router = express.Router();
import userController from '../controllers/userControlller.js';

import { verifyAuth, verifyAdmin } from '../../middlewares/authMiddleware.js';

router.put('/:id', verifyAuth, userController.updateUser);
router.use(verifyAdmin);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);

router.delete('/:id', userController.deleteUser);

export default router;
