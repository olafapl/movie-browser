import { useDispatch } from "react-redux";
import { fetchConfig } from "features/movies/tmdbConfigSlice";
import useSelector from "hooks/useSelector";

const useTmdbConfig = (): [Tmdb.Config | null, boolean, string | null] => {
  const { config, isFetching, error } = useSelector(state => state.tmdbConfig);
  const dispatch = useDispatch();
  if (!config && !isFetching) {
    dispatch(fetchConfig());
  }
  return [config, isFetching, error];
};

export default useTmdbConfig;
