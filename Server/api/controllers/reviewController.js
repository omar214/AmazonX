import mongoose from 'mongoose';
import Product from '../../models/productModel.js';
import Review from '../../models/reviewModel.js';
import createError from '../../utils/createError.js';

const addReview = async (req, res, next) => {
	try {
		const productId = req.params.id;
		if (!productId || !mongoose.isValidObjectId(productId))
			return next(createError(401, 'valid id is required'));

		const { name, comment, rating } = req.body;
		if ((!name, !comment, !rating))
			return next(400, `name & comment & rating is required`);

		const product = await Product.findById(productId);
		if (!product) return next(createError(404, 'product  is not found '));

		const review = new Review({
			productId,
			...req.body,
		});

		const savedReview = await review.save();

		res.status(200).json({
			message: 'review added',
			review: savedReview,
		});
	} catch (error) {
		next(error);
	}
};
const getProductReviews = async (req, res, next) => {
	try {
		const productId = req.params.id;
		if (!productId || !mongoose.isValidObjectId(productId))
			return next(createError(401, 'valid id is required'));

		const product = await Product.findById(productId);
		if (!product) return next(createError(404, 'product  is not found '));

		const reviews = await Review.find({ productId });
		res.status(200).json({
			count: reviews.length,
			reviews,
		});
	} catch (error) {
		next(error);
	}
};

const deleteReview = async (req, res, next) => {
	try {
		const reviewId = req.params.id;
		if (!reviewId || !mongoose.isValidObjectId(reviewId))
			return next(createError(401, 'valid id is required'));

		await Review.deleteOne({ _id: reviewId });
		res.status(200).json({ message: 'review deleted' });
	} catch (error) {
		next(error);
	}
};

export default { addReview, deleteReview, getProductReviews };
