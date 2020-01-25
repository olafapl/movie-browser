import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "store";
import { getMovies } from "api/tmdb";

interface MoviesResults {
  pages: {
    // pageNumber: results
    [key: number]: Tmdb.MovieResult[];
  };
  totalPages: number | null;
  isFetching: boolean;
  error: string | null;
}

interface MoviesState {
  [key: string]: MoviesResults;
}

const initialState: MoviesState = {};

const initialResultsState: MoviesResults = {
  pages: {},
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
      state[endpoint] = {
        ...state[endpoint],
        totalPages: results.total_pages,
        pages: {
          ...state[endpoint].pages,
          [results.page]: results.results
        },
        error: null
      };
    },
    getMoviesFailed(state, action: PayloadAction<FailedPayload>) {
      const { endpoint, error } = action.payload;
      if (!(endpoint in state)) {
        state[endpoint] = initialResultsState;
      }
      state[endpoint] = {
        ...state[endpoint],
        error
      };
    },
    setIsFetching(state, action: PayloadAction<IsFetchingPayload>) {
      const { endpoint, isFetching } = action.payload;
      if (!(endpoint in state)) {
        state[endpoint] = initialResultsState;
      }
      state[endpoint] = {
        ...state[endpoint],
        isFetching
      };
    }
  }
});

export const {
  getMoviesSuccess,
  getMoviesFailed,
  setIsFetching
} = moviesSlice.actions;

export const fetchMovies = (
  endpoint: string,
  page: number
): AppThunk => async dispatch => {
  try {
    dispatch(setIsFetching({ isFetching: true, endpoint }));
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
    dispatch(setIsFetching({ isFetching: false, endpoint }));
  }
};

export default moviesSlice.reducer;
