import { useDispatch } from "react-redux";
import { fetchMovies } from "features/movies/moviesSlice";
import useSelector from "hooks/useSelector";

const useMovies = (
  endpoint: string
): [Tmdb.MovieResult[], () => void, boolean | null, string | null] => {
  const results = useSelector(state => state.movies[endpoint]);
  const dispatch = useDispatch();
  if (results) {
    const { movies, lastPage, totalPages, isFetching, error } = results;
    if (!isFetching && !lastPage && !error) {
      dispatch(fetchMovies(endpoint, 1));
    }
    const fetchNextPage = () => {
      if (
        !isFetching &&
        lastPage &&
        totalPages &&
        lastPage < totalPages &&
        !error
      ) {
        dispatch(fetchMovies(endpoint, lastPage + 1));
      }
    };
    return [movies, fetchNextPage, isFetching, error];
  } else {
    dispatch(fetchMovies(endpoint, 1));
    return [[], () => {}, null, null];
  }
};

export default useMovies;
