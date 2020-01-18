import { useDispatch } from "react-redux";
import { fetchTrendingMovies } from "features/movies/trendingMoviesSlice";
import useSelector from "hooks/useSelector";

const useTrendingMovies = (): [
  Tmdb.MovieResult[],
  () => void,
  boolean,
  string | null
] => {
  const { movies, lastPage, isFetching, error } = useSelector(
    state => state.trendingMovies
  );
  const dispatch = useDispatch();
  if (!isFetching && !lastPage && !error) {
    dispatch(fetchTrendingMovies(1));
  }
  const fetchNextPage = () => {
    if (!isFetching && lastPage) {
      dispatch(fetchTrendingMovies(lastPage + 1));
    }
  };
  return [movies, fetchNextPage, isFetching, error];
};

export default useTrendingMovies;
