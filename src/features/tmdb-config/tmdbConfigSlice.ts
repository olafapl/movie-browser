import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "store";
import { getConfig } from "api/tmdb";

interface TmdbConfigState {
  config: Tmdb.Config | null;
  error: string | null;
}

const initialState: TmdbConfigState = {
  config: null,
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
      state.config = null;
      state.error = action.payload;
    }
  }
});

export const { getConfigSuccess, getConfigFailed } = tmdbConfigSlice.actions;

export const fetchConfig = (): AppThunk => async dispatch => {
  try {
    const config = await getConfig();
    dispatch(getConfigSuccess(config));
  } catch (err) {
    dispatch(getConfigFailed(err.toString()));
  }
};

export default tmdbConfigSlice.reducer;
