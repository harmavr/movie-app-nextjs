import {
	Action,
	combineReducers,
	configureStore,
	ThunkAction,
} from "@reduxjs/toolkit";
import loginSlice from "./features/loginSlice";
import userSlice from "./features/userSlice";
import userActionsSlice from "./features/userActionsSlice";

const rootReducer = combineReducers({
	login: loginSlice,
	user: userSlice,
	userAction: userActionsSlice,
});

export type RootState = ReturnType<
	typeof rootReducer
>;

export const makeStore = () => {
	return configureStore({
		reducer: rootReducer,
	});
};

// Infer the return type of `makeStore`
export type AppStore = ReturnType<
	typeof makeStore
>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> =
	ThunkAction<
		ThunkReturnType,
		RootState,
		unknown,
		Action
	>;
