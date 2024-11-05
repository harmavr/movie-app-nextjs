import { LoginUser } from "./../types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: LoginUser = {
	session_id: "",
};

const loginSlice = createSlice({
	name: "login",
	initialState,
	reducers: {
		saveGuestSessionId(state, action) {
			const { sessionId } = action.payload;

			console.log(sessionId);

			state.session_id = sessionId;
		},
	},
});

export const loginAction = loginSlice.actions;
export default loginSlice.reducer;
