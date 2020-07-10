import React, { useState, useEffect, createContext } from "react";
import { QueryStatus, useQuery } from "react-query";
import { addWeeks } from "date-fns";
import { fetchConfig, Config } from "tmdbConfig/api";
import useMountEffect from "common/useMountEffect";

export interface TmdbConfigContextState {
  config?: Config;
  status: QueryStatus;
  error?: string;
}

const initialState: TmdbConfigContextState = {
  config: undefined,
  status: "loading",
  error: undefined,
};

export const TmdbConfigContext = createContext(initialState);

interface ConfigProviderProps {
  children?: React.ReactNode;
}

const ConfigProvider = ({ children }: ConfigProviderProps) => {
  const [config, setConfig] = useState<Config>();
  const [queryEnabled, setQueryEnabled] = useState(false);
  const { status: queryStatus, data, error } = useQuery(
    "tmdbConfig",
    fetchConfig,
    {
      enabled: queryEnabled,
    }
  );

  // Check if there is a cached config in Local Storage
  useMountEffect(() => {
    const localStorageData = localStorage.getItem("tmdbConfig");
    if (localStorageData) {
      const cachedConfig = JSON.parse(localStorageData);
      if (addWeeks(new Date(cachedConfig.fetchDate), 2) >= new Date()) {
        setConfig(cachedConfig.config);
      } else {
        setQueryEnabled(true);
      }
    } else {
      setQueryEnabled(true);
    }
  });

  // Cache the config in Local Storage
  useEffect(() => {
    if (data) {
      setConfig(data);
      localStorage.setItem(
        "tmdbConfig",
        JSON.stringify({ config: data, fetchDate: new Date().getTime() })
      );
      setQueryEnabled(false);
    }
  }, [data]);

  let status: QueryStatus = "loading";
  if (config) {
    status = "success";
  } else if (!queryEnabled) {
    status = "loading";
  } else {
    status = queryStatus;
  }

  return (
    <TmdbConfigContext.Provider
      value={{
        config,
        status,
        error: error?.message,
      }}
    >
      {children}
    </TmdbConfigContext.Provider>
  );
};

export default ConfigProvider;
