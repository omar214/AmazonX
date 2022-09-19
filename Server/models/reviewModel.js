import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
	{
		productId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product',
			required: [true, 'userId is required'],
		},
		name: { type: String, required: true },
		comment: { type: String, required: true },
		rating: { type: Number, required: true },
	},
	{
		timestamps: true,
	},
);

const Review = mongoose.model('Review', reviewSchema);

export default Review;
