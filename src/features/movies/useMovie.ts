import { useDispatch } from "react-redux";
import { fetchMovie } from "features/movies/movieSlice";
import useSelector from "hooks/useSelector";

const useMovie = (
  movieId: number
): [Tmdb.Movie | null, boolean, string | null] => {
  const results = useSelector(state => state.movie[movieId]);
  const dispatch = useDispatch();
  if (results) {
    const { movie, isFetching, error } = results;
    return [movie, isFetching, error];
  } else {
    dispatch(fetchMovie(movieId));
    return [null, false, null];
  }
};

export default useMovie;
