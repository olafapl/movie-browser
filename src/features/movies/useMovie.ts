import { useEffect } from "react";
import { useDispatch } from "react-redux";
import addWeeks from "date-fns/esm/addWeeks";
import { fetchMovie } from "features/movies/movieSlice";
import useSelector from "hooks/useSelector";

/**
 * @param movieId TMDB movie ID.
 */
const useMovie = (
  movieId: number
): [Tmdb.Movie | null, boolean, string | null] => {
  const movieIds = useSelector((state) => state.movie.movieIds);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDate = movieIds[movieId]?.fetchDate;
    if (
      !(movieId in movieIds) ||
      (!movieIds[movieId].isFetching &&
        (!movieIds[movieId].data ||
          (fetchDate && addWeeks(new Date(fetchDate), 2) < new Date())))
    ) {
      dispatch(fetchMovie(movieId));
    }
  }, [movieId, movieIds, dispatch]);

  return [
    movieIds[movieId]?.data ?? null,
    movieIds[movieId]?.isFetching ?? null,
    movieIds[movieId]?.error ?? null,
  ];
};

export default useMovie;
