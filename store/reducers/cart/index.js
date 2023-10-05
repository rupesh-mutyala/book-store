import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
	name: 'cart',
	initialState: [],
	reducers: {
		addItem: (state, action) => [...state, action.payload],
		increaseQuantity: (state, action) => {
			const item = state.find((book) => book.ISBN === action.payload);

			if (item) {
				item.quantity += 1;
			}
		},
		removeItem: (state, action) => {
			const index = state.findIndex((item) => item.ISBN === action.payload);

			if (index !== -1) {
				state.splice(index, 1);
			}
		},
		decreaseQuantity: (state, action) => {
			const item = state.find((book) => book.ISBN === action.payload);
			if (item && item.quantity > 1) {
				item.quantity -= 1;
			}
		},
	},
});

export const { addItem, increaseQuantity, decreaseQuantity, removeItem } =
	cartSlice.actions;

export default cartSlice.reducer;
