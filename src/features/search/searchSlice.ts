import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "store";
import { searchMovies } from "api/tmdb";

interface SearchState {
  pages: {
    // pageNumber: results
    [key: number]: Tmdb.MovieResult[];
  };
  totalPages: number | null;
  isFetching: boolean;
  error: string | null;
}

const initialState: SearchState = {
  pages: {},
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
      const { results, total_pages, page } = action.payload;
      state.pages[page] = results;
      state.totalPages = total_pages;
    },
    getResultsFailed(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setIsFetching(state, action: PayloadAction<boolean>) {
      state.isFetching = action.payload;
    },
    dropResults(state) {
      state.pages = initialState.pages;
      state.totalPages = initialState.totalPages;
      state.isFetching = initialState.isFetching;
      state.error = initialState.error;
    }
  }
});

export const {
  getResultsSuccess,
  getResultsFailed,
  setIsFetching,
  dropResults
} = searchSlice.actions;

export const fetchResults = (
  query: string,
  page: number
): AppThunk => async dispatch => {
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
