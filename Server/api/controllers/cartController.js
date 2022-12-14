import mongoose from 'mongoose';
import Cart from '../../models/cartModel.js';
import Order from '../../models/orderModel.js';
import createError from '../../utils/createError.js';

const addToCart = async (req, res, next) => {
	try {
		const userId = req.userData.id;
		const { items } = req.body;
		let cart = await Cart.findOne({ userId });

		const isFirst = !cart;
		if (cart) {
			// console.log(cart.items);
			for (let item of items) {
				const idx = cart.items.findIndex((el, idx) =>
					el.product.equals(item.product),
				);
				if (idx !== -1) {
					// inc qty
					cart.items[idx].quantity += item.quantity;
				} else {
					// push item
					cart.items.push(item);
				}
			}
		} else {
			cart = new Cart({ ...req.body, userId });
		}

		const savedCart = await cart.save();

		res.status(200).json({
			message: isFirst
				? 'cart created successfully'
				: 'cart edited successfully',
			cart: savedCart,
		});
	} catch (error) {
		next(error);
		// console.log(error);
	}
};

const getUserCart = async (req, res, next) => {
	try {
		const userId = req.userData.id;

		const cart = await Cart.findOne(
			{ userId },
			{
				items: 1,
				_id: 0,
			},
		).populate({
			path: 'items.product',
			model: 'Product',
			select: 'name price image countInStock',
		});
		res.status(200).json({
			cart,
		});
	} catch (error) {
		next(error);
	}
};

const deleteCart = async (req, res, next) => {
	try {
		const userId = req.userData.id;

		let cart = await Cart.findOne({ userId });
		if (!cart) return next(createError(404, 'Cart not found'));

		await Cart.deleteOne({ userId });
		res.status(200).json('Cart deleted');
	} catch (error) {
		next(error);
	}
};

const deleteItem = async (req, res, next) => {
	try {
		const userId = req.userData.id;
		const { productId } = req.body;

		let cart = await Cart.findOne({ userId });
		if (!cart) return next(createError(404, 'Cart not found'));

		const productIdx = cart.items.findIndex((el) =>
			el.product.equals(productId),
		);
		if (productIdx === -1)
			return next(createError(404, 'product is not in cart'));

		cart.items.splice(productIdx, 1);
		await cart.save();

		res.status(200).json('Item Removed');
	} catch (error) {
		next(error);
	}
};

const checkout = async (req, res, next) => {
	try {
		const userId = req.userData.id;
		const { address, paymentMethod } = req.body;

		const cart = await Cart.findOne(
			{ userId },
			{
				items: 1,
				_id: 0,
			},
		).populate({
			path: 'items.product',
			model: 'Product',
			select: 'price',
		});
		if (!cart) return next(createError(404, 'Cart not found'));

		const totalPrice = cart.items.reduce(
			(acc, item) => acc + item.product.price * item.quantity,
			0,
		);
		let order = new Order({
			totalPrice,
			address,
			paymentMethod,
			items: cart.items,
			userId,
			isPaid: false,
			isDelivered: false,
		});
		const savedOrder = await order.save();
		res.status(200).json({ message: 'checkout done', order: savedOrder });

		await Cart.deleteOne({ userId });
	} catch (error) {
		next(error);
	}
};

export default {
	addToCart,
	deleteCart,
	getUserCart,
	deleteItem,
	checkout,
};
