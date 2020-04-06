import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "store";
import { searchMovies } from "api/tmdb";

interface SearchState {
  results: Tmdb.MovieResult[] | null;
  query: string;
  page: number;
  totalPages: number | null;
  isFetching: boolean;
  error: string | null;
}

const initialState: SearchState = {
  results: null,
  query: "",
  page: 1,
  totalPages: null,
  isFetching: false,
  error: null
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    getResultsSuccess(
      state,
      action: PayloadAction<Tmdb.PaginatedResults<Tmdb.MovieResult>>
    ) {
      const { results, total_pages } = action.payload;
      state.results = results;
      state.totalPages = total_pages;
    },
    getResultsFailed(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setIsFetching(state, action: PayloadAction<boolean>) {
      state.isFetching = action.payload;
    },
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
      state.totalPages = null;
      state.results = null;
      state.page = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    }
  }
});

export const {
  getResultsSuccess,
  getResultsFailed,
  setIsFetching,
  setQuery,
  setPage
} = searchSlice.actions;

export const fetchResults = (): AppThunk => async (dispatch, getState) => {
  const { query, page } = getState().search;
  try {
    dispatch(setIsFetching(true));
    const results = await searchMovies(query, page);
    if ("results" in results) {
      dispatch(getResultsSuccess(results));
    } else {
      dispatch(
        getResultsFailed(`${results.status_code}: ${results.status_message}`)
      );
    }
  } catch (err) {
    dispatch(getResultsFailed(err.toString()));
  } finally {
    dispatch(setIsFetching(false));
  }
};

export default searchSlice.reducer;
