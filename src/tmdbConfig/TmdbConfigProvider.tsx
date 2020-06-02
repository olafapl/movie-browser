import React from "react";
import useTmdbConfig from "tmdbConfig/useTmdbConfig";
import TmdbConfigContext from "tmdbConfig/TmdbConfigContext";

interface ConfigProviderProps {
  children?: React.ReactNode;
}

const ConfigProvider = ({ children }: ConfigProviderProps) => {
  const [config, status, error] = useTmdbConfig();
  return (
    <TmdbConfigContext.Provider
      value={{
        config,
        status,
        error,
      }}
    >
      {children}
    </TmdbConfigContext.Provider>
  );
};

export default ConfigProvider;
