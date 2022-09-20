import express from 'express';
import Product from '../../models/productModel.js';
import User from '../../models/userModel.js';
import data from '../../data/index.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
	await Product.deleteMany({});
	const createdProducts = await Product.insertMany(data.products);
	await User.deleteMany({});
	const createdUsers = await User.insertMany(data.users);
	res.json({
		message: 'seed added to DB',
		createdProducts,
		createdUsers,
	});
});

export default seedRouter;
