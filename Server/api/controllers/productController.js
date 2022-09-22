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
const search = async (req, res, next) => {
	try {
		const PAGE_SIZE = 3;

		const { query } = req;
		const pageSize = query.pageSize || PAGE_SIZE;
		const page = query.page || 1;
		const category = query.category || '';
		const price = query.price || '';
		const rating = query.rating || '';
		const order = query.order || '';
		const searchQuery = query.query || '';

		const queryFilter =
			searchQuery && searchQuery !== 'all'
				? {
						name: {
							$regex: searchQuery,
							$options: 'i',
						},
				  }
				: {};
		const categoryFilter =
			category && category !== 'all'
				? {
						category: { $in: category },
				  }
				: {};
		const ratingFilter =
			rating && rating !== 'all'
				? {
						rating: {
							$gte: Number(rating),
						},
				  }
				: {};
		const priceFilter =
			price && price !== 'all'
				? {
						// 1-50
						price: {
							$gte: Number(price.split('-')[0]),
							$lte: Number(price.split('-')[1]),
						},
				  }
				: {};
		const sortOrder =
			order === 'featured'
				? { featured: -1 }
				: order === 'lowest'
				? { price: 1 }
				: order === 'highest'
				? { price: -1 }
				: order === 'toprated'
				? { rating: -1 }
				: order === 'newest'
				? { createdAt: -1 }
				: { _id: -1 };

		const products = await Product.find({
			...queryFilter,
			...categoryFilter,
			...priceFilter,
			...ratingFilter,
		})
			.sort(sortOrder)
			.skip(pageSize * (page - 1))
			.limit(pageSize);

		const countProducts = await Product.countDocuments({
			...queryFilter,
			...categoryFilter,
			...priceFilter,
			...ratingFilter,
		});
		res.json({
			countProducts: products.length,
			page,
			pages: Math.ceil(countProducts / pageSize),
			products,
		});
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
	search,
};
