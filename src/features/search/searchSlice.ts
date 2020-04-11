import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchMovies } from "api/tmdb";

export const fetchResults = createAsyncThunk(
  "search/fetchResults",
  ({ query, page }: { query: string; page: number }) =>
    searchMovies(query, page)
);

interface SearchResults {
  pages: {
    [key: number]: {
      data: Tmdb.MovieListResult[] | null;
      isFetching: boolean;
      error: string | null;
      fetchDate: number | null;
    };
  };
  totalPages: number | null;
}

interface SearchState {
  queries: {
    [key: string]: SearchResults;
  };
}

const initialState: SearchState = {
  queries: {},
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchResults.pending, (state, action) => {
      const { query, page } = action.meta.arg;
      if (!(query in state.queries)) {
        state.queries[query] = {
          pages: {},
          totalPages: null,
        };
      }
      state.queries[query].pages[page] = {
        data: null,
        isFetching: true,
        error: null,
        fetchDate: null,
      };
    });
    builder.addCase(fetchResults.fulfilled, (state, action) => {
      const { results, total_pages } = action.payload;
      const { query, page } = action.meta.arg;
      state.queries[query].pages[page] = {
        data: results,
        isFetching: false,
        error: null,
        fetchDate: new Date().getTime(),
      };
      state.queries[query].totalPages = total_pages;
    });
    builder.addCase(fetchResults.rejected, (state, action) => {
      const { query, page } = action.meta.arg;
      state.queries[query].pages[page].isFetching = false;
      state.queries[query].pages[page].error = action.error.message!;
      state.queries[query].pages[page].fetchDate = new Date().getTime();
    });
  },
});
export default searchSlice.reducer;
