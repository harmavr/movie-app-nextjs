import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const loginSlice = createSlice({
	initialState,
	reducers: {},
});

export const loginAction = loginSlice.actions;
export default loginSlice.reducer;
