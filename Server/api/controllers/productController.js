import mongoose from 'mongoose';
import Product from '../../models/productModel.js';
import createError from '../../utils/createError.js';
import config from '../../config/index.js';

const addProduct = async (req, res, next) => {
	try {
		// let {
		// 	name,
		// 	description,
		// 	category,
		// 	price,
		// 	countInStock,
		// 	image,
		// 	brand,
		// 	rating,
		// 	numReviews,
		// } = req.body;
		let product;

		const { name } = req.body;
		product = await Product.findOne({ name });
		if (product) return next(createError(409, 'product already exists'));

		product = new Product({ ...req.body });
		const savedProduct = await product.save();

		res.status(200).json({
			message: 'product added',
			product: savedProduct,
		});
	} catch (error) {
		next(error);
	}
};

const getAllProducts = async (req, res, next) => {
	try {
		const products = await Product.find();
		res.status(200).json({
			count: products.length,
			products,
		});
	} catch (error) {
		next(error);
	}
};
const getProductById = async (req, res, next) => {
	try {
		const id = req.params.id;
		if (!id || !mongoose.isValidObjectId(id))
			return next(createError(401, 'valid id is required'));

		const product = await Product.findById(id);
		if (!product) return next(createError(404, 'product is not found '));

		res.status(200).json({ product });
	} catch (error) {
		next(error);
	}
};
const editProduct = async (req, res, next) => {
	try {
		const id = req.params.id;
		if (!id || !mongoose.isValidObjectId(id))
			return next(createError(401, 'valid id is required'));

		let product = await Product.findOne({ _id: id });
		if (!product) return next(createError(404, 'product is not found '));
		for (let key in req.body) {
			product[key] = req.body[key];
		}
		product = await product.save();
		res.status(200).json({ product });
	} catch (error) {
		next(error);
	}
};
const deleteProduct = async (req, res, next) => {
	try {
		const id = req.params.id;
		if (!id || !mongoose.isValidObjectId(id))
			return next(createError(401, 'valid id is required'));

		let product = await Product.findById(id);
		if (!product) return next(createError(404, 'product not found'));

		await Product.deleteOne({ _id: id });
		res.status(200).json('product deleted');
	} catch (error) {
		next(error);
	}
};

export default {
	addProduct,
	getAllProducts,
	getProductById,
	editProduct,
	deleteProduct,
};
