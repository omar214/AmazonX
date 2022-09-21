import { createSlice } from '@reduxjs/toolkit';

const getAddress = () => {
	let temp;
	if (localStorage.getItem('address')) {
		temp = JSON.parse(localStorage.getItem('address'));
	} else {
		temp = {
			address: '',
			city: '',
			country: '',
			postalCode: '',
		};
	}
	return temp;
};

const initialState = {
	cart: localStorage.getItem('cart')
		? JSON.parse(localStorage.getItem('cart'))
		: [],
	cartCount: localStorage.getItem('cart')
		? JSON.parse(localStorage.getItem('cart')).items.length
		: 0,
	address: getAddress(),
	paymentMethod: localStorage.getItem('paymentMethod')
		? JSON.parse(localStorage.getItem('paymentMethod'))
		: 'paypal',
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		setCartItems: (state, action) => {
			state.cart = action.payload;
			state.cartCount = action.payload.items.length;
			localStorage.setItem('cart', JSON.stringify(action.payload));
		},
		setAddress: (state, action) => {
			state.address = action.payload;
			localStorage.setItem('address', JSON.stringify(action.payload));
		},
		setPaymentMethod: (state, action) => {
			state.paymentMethod = action.payload;
			localStorage.setItem('paymentMethod', JSON.stringify(action.payload));
		},
		clearCart: (state) => {
			localStorage.removeItem('cart');
			localStorage.removeItem('paymentMethod');
			localStorage.removeItem('address');
			state.cart = null;
			state.cartCount = 0;
			state.address = getAddress();
			state.paymentMethod = 'paypal';
			state.address = getAddress();
		},
	},
});

export const { setCartItems, clearCart, setAddress, setPaymentMethod } =
	cartSlice.actions;

export default cartSlice.reducer;
