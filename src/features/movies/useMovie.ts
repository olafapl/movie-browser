import { useEffect, useState } from "react";
import { getMovie } from "api/tmdb";

const useMovie = (movieId: number): [Tmdb.Movie | null, boolean, boolean] => {
  const [movie, setMovie] = useState<Tmdb.Movie | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setIsFetching(true);
        const result = await getMovie(movieId);
        if ("id" in result) {
          setMovie(result);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setIsFetching(false);
      }
    };
    fetchMovie();
  }, [movieId]);
  return [movie, isFetching, error];
};

export default useMovie;
