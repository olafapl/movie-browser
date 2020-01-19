import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "store";
import { getMovie } from "api/tmdb";

interface MovieResults {
  movie: Tmdb.Movie | null;
  isFetching: boolean;
  error: string | null;
}

interface MovieState {
  [key: number]: MovieResults;
}
const initialState: MovieState = {};

const initialResultsState: MovieResults = {
  movie: null,
  isFetching: false,
  error: null
};

interface Payload {
  movieId: number;
}

interface MoviePayload extends Payload {
  movie: Tmdb.Movie;
}

interface FailedPayload extends Payload {
  error: string;
}

interface IsFetchingPayload extends Payload {
  isFetching: boolean;
}

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    getMovieSuccess(state, action: PayloadAction<MoviePayload>) {
      const { movieId, movie } = action.payload;
      if (!(movieId in state)) {
        state[movieId] = initialResultsState;
      }
      state[movieId] = {
        ...state[movieId],
        movie
      };
    },
    getMovieFailed(state, action: PayloadAction<FailedPayload>) {
      const { movieId, error } = action.payload;
      if (!(movieId in state)) {
        state[movieId] = initialResultsState;
      }
      state[movieId] = {
        ...state[movieId],
        error
      };
    },
    isFetching(state, action: PayloadAction<IsFetchingPayload>) {
      const { movieId, isFetching } = action.payload;
      if (!(movieId in state)) {
        state[movieId] = initialResultsState;
      }
      state[movieId] = {
        ...state[movieId],
        isFetching
      };
    }
  }
});

export const {
  getMovieSuccess,
  getMovieFailed,
  isFetching
} = movieSlice.actions;

export const fetchMovie = (movieId: number): AppThunk => async dispatch => {
  try {
    dispatch(isFetching({ isFetching: true, movieId }));
    const results = await getMovie(movieId);
    if ("id" in results) {
      dispatch(getMovieSuccess({ movie: results, movieId }));
    } else {
      dispatch(
        getMovieFailed({
          error: `${results.status_code}: ${results.status_message}`,
          movieId
        })
      );
    }
  } catch (err) {
    dispatch(getMovieFailed(err.toString()));
  } finally {
    dispatch(isFetching({ isFetching: false, movieId }));
  }
};

export default movieSlice.reducer;
