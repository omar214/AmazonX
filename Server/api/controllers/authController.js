import User from '../../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import createError from '../../utils/createError.js';
import config from '../../config/index.js';

const singup = async (req, res, next) => {
	try {
		let { email, name, password } = req.body;
		if (!email || !password || !name)
			return next(createError(400, 'Email, name , and password are required'));

		let user = await User.findOne({ email });
		if (user) return next(createError(409, 'User already exists'));

		const hash = bcrypt.hashSync(password);
		user = new User({ ...req.body, password: hash });
		const savedUser = await user.save();

		let { password: _pass, ...other } = savedUser._doc;
		res.status(200).json({ user: other });
	} catch (error) {
		next(error);
	}
};

const login = async (req, res, next) => {
	try {
		let { email, password } = req.body;
		if (!email || !password)
			return next(createError(400, 'Email , and password are required'));

		const user = await User.findOne({ email });
		if (!user) return next(createError(404, 'User not found'));

		console.log(user);

		const isMatch = bcrypt.compareSync(password, user.password);
		if (!isMatch) return next(createError(401, 'Invalid password'));

		const token = jwt.sign({ id: user._id }, config.JWT_PASSWORD, {
			expiresIn: '24h',
		});
		const { password: _pass, ...other } = user._doc;
		res.status(200).json({
			message: 'Login successful',
			token: token,
			user: other,
		});
	} catch (error) {
		console.log(error);
		next(error);
	}
};

const googleAuth = async (req, res, next) => {
	res.send('not done yet');
};

export { singup, login, googleAuth };
