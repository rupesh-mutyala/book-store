import { createSlice } from '@reduxjs/toolkit';

const booksSlice = createSlice({
	name: 'books',
	initialState: [],
	reducers: {
		setBooks: (_, action) => [...action.payload],
	},
});

export const { setBooks } = booksSlice.actions;

export default booksSlice.reducer;
