import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMovie } from "api/tmdb";

export const fetchMovie = createAsyncThunk(
  "movie/fetchMovie",
  async (movieId: number, thunkAPI) => {
    const response = await getMovie(movieId);
    if ("id" in response) {
      return response;
    } else {
      return thunkAPI.rejectWithValue(
        `${response.status_code}: ${response.status_message}`
      );
    }
  }
);

interface MovieResult {
  data: Tmdb.Movie | null;
  isFetching: boolean;
  error: string | null;
  fetchDate: number | null;
}

interface MovieState {
  movieIds: {
    [key: number]: MovieResult;
  };
}
const initialState: MovieState = {
  movieIds: {},
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovie.pending, (state, action) => {
      const movieId = action.meta.arg;
      state.movieIds[movieId] = {
        data: null,
        isFetching: true,
        error: null,
        fetchDate: null,
      };
    });
    builder.addCase(fetchMovie.fulfilled, (state, action) => {
      const movieId = action.meta.arg;
      state.movieIds[movieId] = {
        data: action.payload,
        isFetching: false,
        error: null,
        fetchDate: new Date().getTime(),
      };
    });
    builder.addCase(fetchMovie.rejected, (state, action) => {
      const movieId = action.meta.arg;
      state.movieIds[movieId].isFetching = false;
      state.movieIds[movieId].error = action.payload as string;
    });
  },
});

export default movieSlice.reducer;
