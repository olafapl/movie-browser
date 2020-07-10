import { createContext } from "react";
import useTmdbConfig from "tmdbConfig/useTmdbConfig";

type UseTmdbConfig = ReturnType<typeof useTmdbConfig>;

interface ConfigContextState {
  config: UseTmdbConfig[0];
  status: UseTmdbConfig[1];
  error: UseTmdbConfig[2];
}

const initialState: ConfigContextState = {
  config: undefined,
  status: "loading",
  error: undefined,
};

const ConfigContext = createContext(initialState);

export default ConfigContext;
