import { configureStore, combineReducers, Action } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import tmdbConfigReducer from "features/tmdb-config/tmdbConfigSlice";

export const rootReducer = combineReducers({ tmdbConfig: tmdbConfigReducer });
export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;
