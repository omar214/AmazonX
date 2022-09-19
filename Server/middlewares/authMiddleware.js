import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import createError from '../utils/createError.js';

// Verify
const verifyAuth = (req, res, next) => {
	const token = req.headers.authorization;
	const JWT_KEY = config.JWT_PASSWORD;

	if (!token) next(createError(401, 'No token provided'));
	try {
		const decoded = jwt.verify(token, JWT_KEY);
		req.userData = decoded;
		next();
	} catch (err) {
		next(err);
	}
};
const verifyAdmin = (req, res, next) => {
	const token = req.headers.authorization;
	const JWT_KEY = config.JWT_PASSWORD;

	if (!token) next(createError(401, 'No token provided'));
	try {
		const decoded = jwt.verify(token, JWT_KEY);
		if (decoded.isAdmin) {
			next();
		} else {
			next(createError(404, 'you are not admin'));
		}
	} catch (err) {
		next(err);
	}
};

export { verifyAdmin, verifyAuth };
