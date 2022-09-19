import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Name is required'],
		},
		email: {
			type: String,
			required: [true, 'Email is required'],
			unique: [true, 'Email is already in use'],
		},
		password: {
			type: String,
			minlength: [6, 'Password must be at least 6 characters'],
			required: [true, 'Password is required'],
		},
		image: {
			type: String,
			default: 'https://robohash.org/YOUR-TEXT.png',
		},
	},
	{ timestamps: true },
);

const User = mongoose.model('User', userSchema);

export default User;
