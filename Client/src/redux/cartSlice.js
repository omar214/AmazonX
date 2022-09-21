import { createSlice } from '@reduxjs/toolkit';

const getAddress = () => {
	let temp;
	if (localStorage.getItem('address')) {
		temp = JSON.parse(localStorage.getItem('address'));
	} else {
		temp = {
			name: '',
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
		clearCart: (state) => {
			localStorage.removeItem('cart');
			state.cart = null;
			state.cartCount = 0;
			state.address = getAddress();
		},
	},
});

export const { setCartItems, clearCart, setAddress } = cartSlice.actions;

export default cartSlice.reducer;
