import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getConfig } from "api/tmdb";

export const fetchConfig = createAsyncThunk(
  "tmdbConfig/fetchConfig",
  async (arg, thunkApi) => {
    return await getConfig();
  }
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
    builder.addCase(fetchConfig.pending, (state, action) => {
      state.isFetching = true;
    });
    builder.addCase(fetchConfig.fulfilled, (state, action) => {
      state.config = action.payload;
      state.isFetching = false;
      state.error = null;
      state.fetchDate = new Date().getTime();
    });
    builder.addCase(fetchConfig.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

export default tmdbConfigSlice.reducer;
