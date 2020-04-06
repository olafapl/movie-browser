import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMovies } from "api/tmdb";

interface FetchArgs {
  endpoint: string;
  page: number;
}

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({ endpoint, page }: FetchArgs, thunkAPI) => {
    const response = await getMovies(endpoint, page);
    if ("results" in response) {
      return response;
    } else {
      return thunkAPI.rejectWithValue(
        `${response.status_code}: ${response.status_message}`
      );
    }
  }
);

interface MoviesResults {
  pages: {
    [key: number]: Tmdb.MovieResult[];
  };
  totalPages: number | null;
}

interface MoviesState {
  endpoints: {
    [key: string]: MoviesResults;
  };
  isFetching: boolean;
  error: string | null;
}

const initialState: MoviesState = {
  endpoints: {},
  isFetching: false,
  error: null,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.pending, (state, action) => {
      state.isFetching = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      const response = action.payload;
      const { endpoint, page } = action.meta.arg;
      const { results, total_pages } = response;
      if (!(endpoint in state.endpoints)) {
        state.endpoints[endpoint] = { pages: {}, totalPages: null };
      }
      state.endpoints[endpoint].pages[page] = results;
      state.endpoints[endpoint].totalPages = total_pages;
      state.isFetching = false;
      state.error = null;
    });
    builder.addCase(fetchMovies.rejected, (state, action) => {
      state.isFetching = false;
      state.error = action.payload as string;
    });
  },
});

export default moviesSlice.reducer;
