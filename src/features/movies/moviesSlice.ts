import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "store";
import { getMovies } from "api/tmdb";

interface MoviesResults {
  movies: Tmdb.MovieResult[];
  lastPage: number | null;
  totalPages: number | null;
  isFetching: boolean;
  error: string | null;
}

interface MoviesState {
  [key: string]: MoviesResults;
}

const initialState: MoviesState = {};

const initialResultsState: MoviesResults = {
  movies: [],
  lastPage: null,
  totalPages: null,
  isFetching: false,
  error: null
};

interface Payload {
  endpoint: string;
}

interface MoviesPayload extends Payload {
  results: Tmdb.PaginatedResults<Tmdb.MovieResult>;
}

interface FailedPayload extends Payload {
  error: string;
}

interface IsFetchingPayload extends Payload {
  isFetching: boolean;
}

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    getMoviesSuccess(state, action: PayloadAction<MoviesPayload>) {
      const { endpoint, results } = action.payload;
      if (!(endpoint in state)) {
        state[endpoint] = initialResultsState;
      }
      state[endpoint].totalPages = results.total_pages;
      if (results.page === 1) {
        state[endpoint].movies = results.results;
        state[endpoint].lastPage = 1;
      } else if (
        state[endpoint]?.lastPage &&
        results.page === state[endpoint]?.lastPage + 1
      ) {
        state[endpoint].movies.push(...results.results);
        state[endpoint].lastPage = results.page;
      }
    },
    getMoviesFailed(state, action: PayloadAction<FailedPayload>) {
      const { endpoint, error } = action.payload;
      if (!(endpoint in state)) {
        state[endpoint] = initialResultsState;
      }
      state[endpoint].error = error;
    },
    isFetching(state, action: PayloadAction<IsFetchingPayload>) {
      const { endpoint, isFetching } = action.payload;
      if (!(endpoint in state)) {
        state[endpoint] = initialResultsState;
      }
      state[endpoint].isFetching = isFetching;
    }
  }
});

export const {
  getMoviesSuccess,
  getMoviesFailed,
  isFetching
} = moviesSlice.actions;

export const fetchMovies = (
  endpoint: string,
  page: number
): AppThunk => async dispatch => {
  try {
    dispatch(isFetching({ isFetching: true, endpoint }));
    const results = await getMovies(endpoint, page);
    if ("results" in results) {
      dispatch(getMoviesSuccess({ results, endpoint }));
    } else {
      dispatch(
        getMoviesFailed({
          error: `${results.status_code}: ${results.status_message}`,
          endpoint
        })
      );
    }
  } catch (err) {
    dispatch(getMoviesFailed(err.toString()));
  } finally {
    dispatch(isFetching({ isFetching: false, endpoint }));
  }
};

export default moviesSlice.reducer;
