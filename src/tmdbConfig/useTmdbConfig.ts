import { useState } from "react";
import { QueryStatus } from "react-query";
import addWeeks from "date-fns/esm/addWeeks";
import { getConfig } from "common/tmdbApi";
import useMountEffect from "common/useMountEffect";

interface CachedConfig {
  config: Tmdb.Config;
  fetchDate: number;
}

const useTmdbConfig = (): [
  Tmdb.Config | undefined,
  QueryStatus,
  string | undefined
] => {
  const [error, setError] = useState<string>();
  const [config, setConfig] = useState<Tmdb.Config>();

  useMountEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await getConfig();
        setError(undefined);
        setConfig(response);
        localStorage.setItem(
          "tmdbConfig",
          JSON.stringify({ config: response, fetchDate: new Date().getTime() })
        );
      } catch (e) {
        setError((e as Error).message);
      }
    };

    const localStorageData = localStorage.getItem("tmdbConfig");
    if (localStorageData) {
      const cachedConfig: CachedConfig = JSON.parse(localStorageData);
      if (addWeeks(new Date(cachedConfig.fetchDate), 2) >= new Date()) {
        setConfig(cachedConfig.config);
      } else {
        fetchConfig();
      }
    } else {
      fetchConfig();
    }
  });

  let status: QueryStatus = "loading";
  if (config) {
    status = "success";
  } else if (error) {
    status = "error";
  }
  return [config, status, error];
};

export default useTmdbConfig;
