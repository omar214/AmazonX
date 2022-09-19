import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Name is required'],
		},
		description: {
			type: String,
			required: [true, 'description is required'],
		},
		category: {
			type: [String],
			default: ['clothes'],
		},
		price: {
			type: Number,
			validate: {
				validator: (value) => value > 0,
				message: 'price must be > 0',
			},
		},
		countInStock: {
			type: Number,
			default: 5,
			validate: {
				validator: (value) => value > 0,
				message: 'countInStock must be > 0',
			},
		},
		image: {
			type: String,
			default: 'http://via.placeholder.com/150',
		},
		brand: {
			type: String,
			default: 'clothes',
		},
		rating: {
			type: Number,
			default: 3,
			validate: {
				validator: (value) => value >= 0 && value <= 5,
				message: 'rating must be between [0 : 5]',
			},
		},
		numReviews: {
			type: Number,
			default: 5,
			validate: {
				validator: (value) => value >= 0,
				message: 'num Reviews must be >= 0',
			},
		},
	},
	{ timestamps: true },
);

const Product = mongoose.model('Product', productSchema);

export default Product;
