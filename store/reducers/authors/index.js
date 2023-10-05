import { createSlice } from '@reduxjs/toolkit';

const authorsSlice = createSlice({
	name: 'authors',
	initialState: [],
	reducers: {
		setAuthors: (_, action) => [...action.payload],
	},
});

export const { setAuthors } = authorsSlice.actions;

export default authorsSlice.reducer;
