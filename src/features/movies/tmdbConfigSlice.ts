import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getConfig } from "api/tmdb";

export const fetchConfig = createAsyncThunk("tmdbConfig/fetchConfig", () =>
  getConfig()
);

interface TmdbConfigState {
  config: Tmdb.Config | null;
  isFetching: boolean;
  error: string | null;
  fetchDate: number | null;
}

const initialState: TmdbConfigState = {
  config: null,
  isFetching: false,
  error: null,
  fetchDate: null,
};

const tmdbConfigSlice = createSlice({
  name: "tmdbConfig",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchConfig.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(fetchConfig.fulfilled, (state, action) => {
      state.config = action.payload;
      state.isFetching = false;
      state.error = null;
      state.fetchDate = new Date().getTime();
    });
    builder.addCase(fetchConfig.rejected, (state, action) => {
      state.isFetching = false;
      state.error = action.error.message!;
      state.fetchDate = new Date().getTime();
    });
  },
});

export default tmdbConfigSlice.reducer;
