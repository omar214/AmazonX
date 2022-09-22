import mongoose from 'mongoose';
import User from '../../models/userModel.js';
import createError from '../../utils/createError.js';
import config from '../../config/index.js';
import bcrypt from 'bcryptjs';
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

		const { email, password } = req.body;
		let user = await User.findOne({ email });
		let myUser = await User.findOne({ _id: id });

		if (user && myUser.email !== email)
			return next(createError(400, 'Email Already in use'));
		if (!myUser) return next(createError(404, 'user is not found '));

		// not admin & not order owner
		if (req.userData.id !== id && !req.userData.isAdmin)
			return next(createError(403, 'you can only update your order'));

		for (let key in req.body) {
			myUser[key] = req.body[key];
		}
		if (password) myUser.password = bcrypt.hashSync(password);

		myUser = await myUser.save();
		res.status(200).json({
			message: 'user updates successfully',
			user: myUser,
		});
	} catch (error) {
		next(error);
	}
};
const deleteUser = async (req, res, next) => {
	try {
		const id = req.params.id;
		if (!id || !mongoose.isValidObjectId(id))
			return next(createError(401, 'valid id is required'));

		let user = await User.findById(id);
		if (!user) return next(createError(404, 'user not found'));

		await User.deleteOne({ _id: id });
		res.status(200).json('user deleted');
	} catch (error) {
		next(error);
	}
};

export default { getAllUsers, getUserById, updateUser, deleteUser };
