import { useContext } from "react";
import { TmdbConfigContext } from "tmdbConfig/TmdbConfigProvider";

const useTmdbConfig = () => {
  const state = useContext(TmdbConfigContext);
  return state;
};

export default useTmdbConfig;
