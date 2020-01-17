import { configureStore, combineReducers, Action } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import tmdbConfigReducer from "features/movies/tmdbConfigSlice";
import trendingMoviesReducer from "features/movies/trendingMoviesSlice";

export const rootReducer = combineReducers({
  tmdbConfig: tmdbConfigReducer,
  trendingMovies: trendingMoviesReducer
});
export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;
