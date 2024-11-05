import { createSlice } from "@reduxjs/toolkit";
import { UserDetails } from "../types";

const initialState: UserDetails = {
	first_name: "char",
	last_name: "mavr",
	email: "a@a",
	password: "1234",
	phone: 6969,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		loginUser(state, action) {
			const { email, phone, password } =
				action.payload;

			state.email = email;
			state.phone = phone;
			state.password = password;
		},
	},
});

export const userAction = userSlice.actions;
export default userSlice.reducer;
