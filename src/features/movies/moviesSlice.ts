import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMovies } from "api/tmdb";

interface FetchArgs {
  endpoint: string;
  page: number;
}

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({ endpoint, page }: FetchArgs, thunkAPI) => {
    try {
      const response = await getMovies(endpoint, page);
      if ("results" in response) {
        return response;
      } else {
        return thunkAPI.rejectWithValue(
          `${response.status_code}: ${response.status_message}`
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.toString());
    }
  }
);

interface MoviesResults {
  pages: {
    [key: number]: {
      data: Tmdb.MovieResult[] | null;
      isFetching: boolean;
      error: string | null;
      fetchDate: number | null;
    };
  };
  totalPages: number | null;
}

interface MoviesState {
  endpoints: {
    [key: string]: MoviesResults;
  };
}

const initialState: MoviesState = {
  endpoints: {},
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.pending, (state, action) => {
      const { endpoint, page } = action.meta.arg;
      if (!(endpoint in state.endpoints)) {
        state.endpoints[endpoint] = {
          pages: {},
          totalPages: null,
        };
      }
      state.endpoints[endpoint].pages[page] = {
        data: null,
        isFetching: true,
        error: null,
        fetchDate: null,
      };
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      const { results, total_pages } = action.payload;
      const { endpoint, page } = action.meta.arg;
      state.endpoints[endpoint].pages[page] = {
        data: results,
        isFetching: false,
        error: null,
        fetchDate: new Date().getTime(),
      };
      state.endpoints[endpoint].totalPages = total_pages;
    });
    builder.addCase(fetchMovies.rejected, (state, action) => {
      const { endpoint, page } = action.meta.arg;
      state.endpoints[endpoint].pages[page].isFetching = false;
      state.endpoints[endpoint].pages[page].error = action.payload as string;
      state.endpoints[endpoint].pages[page].fetchDate = new Date().getTime();
    });
  },
});

export default moviesSlice.reducer;
