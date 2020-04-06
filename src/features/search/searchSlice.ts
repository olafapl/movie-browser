import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchMovies } from "api/tmdb";

interface FetchArgs {
  query: string;
  page: number;
}

export const fetchResults = createAsyncThunk(
  "search/fetchResults",
  async ({ query, page }: FetchArgs, thunkAPI) => {
    const response = await searchMovies(query, page);
    if ("results" in response) {
      return response;
    } else {
      return thunkAPI.rejectWithValue(
        `${response.status_code}: ${response.status_message}`
      );
    }
  }
);

interface SearchResults {
  pages: {
    [key: number]: Tmdb.MovieResult[];
  };
  totalPages: number | null;
}

interface SearchState {
  queries: {
    [key: string]: SearchResults;
  };
  isFetching: boolean;
  error: string | null;
}

const initialState: SearchState = {
  queries: {},
  isFetching: false,
  error: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchResults.pending, (state, action) => {
      state.isFetching = true;
    });
    builder.addCase(fetchResults.fulfilled, (state, action) => {
      const response = action.payload;
      const { query, page } = action.meta.arg;
      const { results, total_pages } = response;
      if (!(query in state.queries)) {
        state.queries[query] = {
          pages: {},
          totalPages: null,
        };
      }
      state.queries[query].pages[page] = results;
      state.queries[query].totalPages = total_pages;
      state.isFetching = false;
      state.error = null;
    });
    builder.addCase(fetchResults.rejected, (state, action) => {
      state.isFetching = false;
      state.error = action.payload as string;
    });
  },
});
export default searchSlice.reducer;
