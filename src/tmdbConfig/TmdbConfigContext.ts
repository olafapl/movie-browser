import { createContext } from "react";

interface ConfigContextState {
  config?: Tmdb.Config;
  status: Status;
  error?: string;
}

const initialState: ConfigContextState = {
  config: undefined,
  status: "loading",
  error: undefined,
};

const ConfigContext = createContext(initialState);

export default ConfigContext;
