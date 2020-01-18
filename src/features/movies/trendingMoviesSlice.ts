import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "store";
import { getTrendingMovies } from "api/tmdb";

interface TrendingMoviesState {
  movies: Tmdb.MovieResult[];
  lastPage: number | null;
  isFetching: boolean;
  error: string | null;
}

const initialState: TrendingMoviesState = {
  movies: [],
  lastPage: null,
  isFetching: false,
  error: null
};

type TrendingMoviesPayload = Tmdb.PaginatedResults<Tmdb.MovieResult>;

const trendingMoviesSlice = createSlice({
  name: "trendingMovies",
  initialState,
  reducers: {
    getTrendingMoviesSuccess(
      state,
      action: PayloadAction<TrendingMoviesPayload>
    ) {
      const { page, results } = action.payload;
      if (page === 1) {
        state.movies = results;
        state.lastPage = 1;
      } else if (state.lastPage && page === state.lastPage + 1) {
        state.movies.push(...results);
        state.lastPage = page;
      }
    },
    getTrendingMoviesFailed(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    isFetching(state, action: PayloadAction<boolean>) {
      state.isFetching = action.payload;
    }
  }
});

export const {
  getTrendingMoviesSuccess,
  getTrendingMoviesFailed,
  isFetching
} = trendingMoviesSlice.actions;

export const fetchTrendingMovies = (
  page: number
): AppThunk => async dispatch => {
  try {
    dispatch(isFetching(true));
    const result = await getTrendingMovies(page);
    if ("results" in result) {
      dispatch(getTrendingMoviesSuccess(result));
    } else {
      dispatch(
        getTrendingMoviesFailed(
          `${result.status_code}: ${result.status_message}`
        )
      );
    }
  } catch (err) {
    dispatch(getTrendingMoviesFailed(err.toString()));
  } finally {
    dispatch(isFetching(false));
  }
};

export default trendingMoviesSlice.reducer;
