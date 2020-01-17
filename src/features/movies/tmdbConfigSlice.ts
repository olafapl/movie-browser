import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "store";
import { getConfig } from "api/tmdb";

interface TmdbConfigState {
  config: Tmdb.Config | null;
  isFetching: boolean;
  error: string | null;
}

const initialState: TmdbConfigState = {
  config: null,
  isFetching: false,
  error: null
};

const tmdbConfigSlice = createSlice({
  name: "tmdbConfig",
  initialState,
  reducers: {
    getConfigSuccess(state, action: PayloadAction<Tmdb.Config>) {
      state.config = action.payload;
      state.error = null;
    },
    getConfigFailed(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    isFetching(state, action: PayloadAction<boolean>) {
      state.isFetching = action.payload;
    }
  }
});

export const {
  getConfigSuccess,
  getConfigFailed,
  isFetching
} = tmdbConfigSlice.actions;

export const fetchConfig = (): AppThunk => async dispatch => {
  try {
    dispatch(isFetching(true));
    const config = await getConfig();
    dispatch(getConfigSuccess(config));
  } catch (err) {
    dispatch(getConfigFailed(err.toString()));
  } finally {
    dispatch(isFetching(false));
  }
};

export default tmdbConfigSlice.reducer;
