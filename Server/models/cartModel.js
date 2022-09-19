import mongoose from 'mongoose';

var subProduct = mongoose.Schema(
	{
		quantity: {
			type: Number,
			default: 1,
		},
		product: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product',
		},
	},
	{ _id: false },
);

const cartSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: [true, 'userId is required'],
			unique: [true, 'cart already exist'],
		},
		items: {
			type: [subProduct],
			default: [],
		},
	},
	{ timestamps: true },
);

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
