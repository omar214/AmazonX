import express from 'express';
const router = express.Router();
import userController from '../controllers/userControlller.js';


import verifyAuth from '../../middlewares/authMiddleware.js';


router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);

router.delete('/:id', verifyAuth, userController.deleteUser);
router.put('/:id', verifyAuth, userController.updateUser);

export default router;
