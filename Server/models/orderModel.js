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

const orderSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: [true, 'userId is required'],
		},
		items: {
			type: [subProduct],
		},
		totalPrice: {
			type: Number,
			default: 0,
		},
		isPaid: {
			type: Boolean,
			default: false,
		},
		paymentMethod: {
			type: String,
			default: 'paypal',
		},
		isDelivered: {
			type: Boolean,
			default: false,
		},
		address: {
			type: String,
			default: 'user address',
		},
	},
	{ timestamps: true },
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
