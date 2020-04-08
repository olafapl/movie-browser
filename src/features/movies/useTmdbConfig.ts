import { useDispatch } from "react-redux";
import addWeeks from "date-fns/esm/addWeeks";
import { fetchConfig } from "features/movies/tmdbConfigSlice";
import useSelector from "hooks/useSelector";

const useTmdbConfig = (): [Tmdb.Config | null, boolean, string | null] => {
  const { config, isFetching, error, fetchDate } = useSelector(
    (state) => state.tmdbConfig
  );
  const dispatch = useDispatch();

  if (
    !config &&
    !isFetching &&
    (!fetchDate || addWeeks(new Date(fetchDate), 2) < new Date())
  ) {
    dispatch(fetchConfig());
  }

  return [config, isFetching, error];
};

export default useTmdbConfig;
