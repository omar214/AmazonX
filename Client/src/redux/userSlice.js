import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	currentUser: localStorage.getItem('currentUser')
		? JSON.parse(localStorage.getItem('currentUser'))
		: null,
	loading: false,
	error: false,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		loginStart: (state) => {
			state.loading = true;
		},
		loginSuccess: (state, action) => {
			state.loading = false;
			state.currentUser = action.payload;
			localStorage.setItem('currentUser', JSON.stringify(action.payload));
		},
		loginFailure: (state) => {
			state.loading = false;
			state.error = true;
		},
		logout: (state) => {
			state.currentUser = null;
			localStorage.clear();
			localStorage.clear();
		},
	},
});

export const { loginStart, loginSuccess, loginFailure, logout } =
	userSlice.actions;

export default userSlice.reducer;
