import { createSlice } from "@reduxjs/toolkit";
import { UserPreferences } from "../types";

const initialState: UserPreferences = {
	movie: [],
};

const userActionsSlice = createSlice({
	name: "userActions",
	initialState,
	reducers: {
		postRate(state, action) {
			const { id, rating } = action.payload;

			const foundMovieIndex =
				state.movie.findIndex(
					(movie) => movie.movie_id === id
				);

			if (foundMovieIndex === -1) {
				state.movie.push({
					movie_id: id,
					rate: rating,
				});
			} else {
				state.movie[foundMovieIndex].rate =
					rating;
			}
			state.movie.forEach((el) =>
				console.log(el.movie_id, el.rate)
			);
		},
	},
});

export const userActionsAction =
	userActionsSlice.actions;
export default userActionsSlice.reducer;
