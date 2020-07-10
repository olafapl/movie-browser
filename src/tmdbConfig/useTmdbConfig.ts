import { useContext } from "react";
import {
  TmdbConfigContext,
  TmdbConfigContextState,
} from "tmdbConfig/TmdbConfigProvider";

const useTmdbConfig = (): TmdbConfigContextState => {
  const state = useContext(TmdbConfigContext);
  return state;
};

export default useTmdbConfig;
