import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import addWeeks from "date-fns/esm/addWeeks";
import { fetchMovie } from "features/movies/movieSlice";
import useSelector from "hooks/useSelector";

/**
 * @param movieId TMDB movie ID.
 */
const useMovie = (
  movieId: number
): [Tmdb.Movie | null, boolean | null, string | null] => {
  const [argDate, setArgDate] = useState(new Date().getTime());
  const movie = useSelector((state) => state.movie.movieIds[movieId]);
  const dispatch = useDispatch();

  useEffect(() => {
    setArgDate(new Date().getTime());
  }, [movieId]);

  useEffect(() => {
    if (
      !movie?.isFetching &&
      (!movie?.data || addWeeks(new Date(movie.fetchDate!), 2) < new Date()) &&
      (!movie?.fetchDate || movie.fetchDate < argDate)
    ) {
      dispatch(fetchMovie(movieId));
    }
  }, [movieId, argDate, movie, dispatch]);

  return [movie?.data ?? null, movie?.isFetching ?? null, movie?.error ?? null];
};

export default useMovie;
