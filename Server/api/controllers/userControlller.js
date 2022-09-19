import mongoose from 'mongoose';
import User from '../../models/userModel.js';
import createError from '../../utils/createError.js';
import config from '../../config/index.js';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

const getAllUsers = async (req, res, next) => {
	try {
		const users = await User.find();
		res.status(200).json({
			count: users.length,
			users,
		});
	} catch (error) {
		next(error);
	}
};
const getUserById = async (req, res, next) => {
	try {
		const id = req.params.id;
		if (!id || !mongoose.isValidObjectId(id))
			return next(createError(401, 'valid id is required'));

		const user = await User.findOne({ _id: id });
		if (!user) return next(createError(404, 'user is not found '));

		res.status(200).json({ user });
	} catch (error) {
		next(error);
	}
};

const updateUser = async (req, res, next) => {
	try {
		const id = req.params.id;
		if (!id || !mongoose.isValidObjectId(id))
			return next(createError(401, 'valid id is required'));

		if (req.userData.id !== id)
			return next(createError(403, 'you can only update your email'));

		let user = await User.findOne({ _id: id });
		if (!user) return next(createError(404, 'user is not found '));
		for (let key in req.body) {
			user[key] = req.body[key];
		}
		user = await user.save();
		res.status(200).json({ user });
	} catch (error) {
		next(error);
	}
};
const deleteUser = async (req, res, next) => {
	try {
		const id = req.params.id;
		if (!id || !mongoose.isValidObjectId(id))
			return next(createError(401, 'valid id is required'));

		if (req.userData.id !== id)
			return next(createError(403, 'you can only delete your email'));
		let user = await User.findById(id);
		if (!user) return next(createError(404, 'user not found'));

		await User.deleteOne({ _id: id });
		res.status(200).json('user deleted');
	} catch (error) {
		next(error);
	}
};

export default { getAllUsers, getUserById, updateUser, deleteUser };
