import express from 'express';
const router = express.Router();
import userController from '../controllers/userControlller.js';

import { verifyAuth, verifyAdmin } from '../../middlewares/authMiddleware.js';

router.use(verifyAdmin);

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);

router.delete('/:id', userController.deleteUser);
router.put('/:id', userController.updateUser);

export default router;
