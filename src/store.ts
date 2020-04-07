import {
  configureStore,
  combineReducers,
  Action,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import thunk, { ThunkAction } from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import tmdbConfigReducer from "features/movies/tmdbConfigSlice";
import moviesReducer from "features/movies/moviesSlice";
import movieReducer from "features/movies/movieSlice";
import searchReducer from "features/search/searchSlice";

export const rootReducer = combineReducers({
  tmdbConfig: persistReducer(
    {
      key: "tmdbConfig",
      storage,
    },
    tmdbConfigReducer
  ),
  movies: moviesReducer,
  movie: persistReducer(
    {
      key: "movie",
      storage,
    },
    movieReducer
  ),
  search: searchReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware({ serializableCheck: false }), thunk], // Serializible state check does not pass with redux-persist
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;
