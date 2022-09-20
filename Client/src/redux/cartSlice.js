import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	cart: localStorage.getItem('cart')
		? JSON.parse(localStorage.getItem('cart'))
		: null,
	cartCount: localStorage.getItem('cart')
		? JSON.parse(localStorage.getItem('cart')).items.length
		: 0,
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
		clearCart: (state) => {
			localStorage.removeItem('cart');
			state.cart = null;
			state.cartCount = 0;
		},
	},
});

export const { setCartItems, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
