import mongoose from 'mongoose';
import Order from '../../models/orderModel.js';
import createError from '../../utils/createError.js';
import config from '../../config/index.js';

const addOrder = async (req, res, next) => {
	try {
		const userId = req.userData.id;
		let order;
		order = new Order({ ...req.body, userId });
		const savedOrder = await order.save();

		res.status(200).json({
			message: 'order added',
			order: savedOrder,
		});
	} catch (error) {
		next(error);
		// console.log(error);
	}
};

const getAllOrders = async (req, res, next) => {
	try {
		const orders = await Order.find();
		res.status(200).json({
			count: orders.length,
			orders,
		});
	} catch (error) {
		next(error);
	}
};
const getOrderById = async (req, res, next) => {
	try {
		const id = req.params.id;
		if (!id || !mongoose.isValidObjectId(id))
			return next(createError(401, 'valid id is required'));

		const order = await Order.findById(id).populate({
			path: 'items.product',
			model: 'Product',
			select: 'name price image',
		});
		if (!order) return next(createError(404, 'order is not found '));

		res.status(200).json({ order });
	} catch (error) {
		next(error);
	}
};
const editOrder = async (req, res, next) => {
	try {
		const id = req.params.id;
		if (!id || !mongoose.isValidObjectId(id))
			return next(createError(401, 'valid id is required'));

		let order = await Order.findOne({ _id: id });
		if (!order) return next(createError(404, 'order is not found '));

		console.log(order.userId);
		console.log(req.userData.id);

		// not admin & not order owner
		if (!order.userId.equals(req.userData.id) && !req.userData.isAdmin)
			return next(createError(403, 'you can only update your order'));

		for (let key in req.body) {
			order[key] = req.body[key];
		}
		order = await order.save();
		res.status(200).json({ order });
	} catch (error) {
		next(error);
	}
};
const payOrder = async (req, res, next) => {
	try {
		const id = req.params.id;
		if (!id || !mongoose.isValidObjectId(id))
			return next(createError(401, 'valid id is required'));

		let order = await Order.findOne({ _id: id });
		if (!order) return next(createError(404, 'order is not found '));

		// not admin & not order owner
		if (!order.userId.equals(req.userData.id) && !req.userData.isAdmin)
			return next(createError(403, 'you can only update your order'));

		order.isPaid = true;
		order.paidAt = Date.now();
		order = await order.save();
		res.status(200).json({ message: 'order Paid Successfully', order });
	} catch (error) {
		next(error);
	}
};
const getUserOrders = async (req, res, next) => {
	try {
		const userId = req.userData.id;

		const orders = await Order.find({ userId });
		res.status(200).json({
			count: orders.length,
			orders,
		});
	} catch (error) {
		next(error);
	}
};
const deleteOrder = async (req, res, next) => {
	try {
		const id = req.params.id;
		if (!id || !mongoose.isValidObjectId(id))
			return next(createError(401, 'valid id is required'));

		let order = await Order.findById(id);
		if (!order) return next(createError(404, 'order not found'));

		await Order.deleteOne({ _id: id });
		res.status(200).json('order deleted');
	} catch (error) {
		next(error);
	}
};

export default {
	addOrder,
	getAllOrders,
	getOrderById,
	editOrder,
	deleteOrder,
	getUserOrders,
	payOrder,
};
