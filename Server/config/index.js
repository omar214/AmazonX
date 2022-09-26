import dotenv from 'dotenv';
dotenv.config();

const { PORT, ENV, dbURI, SALT, PEPPER, JWT_PASSWORD, STRIPE_SECRET_KEY } =
	process.env;

export default {
	PORT: PORT || 5000,
	ENV,
	dbURI,
	SALT,
	PEPPER,
	JWT_PASSWORD,
	STRIPE_SECRET_KEY,
};
