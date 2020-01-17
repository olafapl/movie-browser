import React from "react";
import { useDispatch } from "react-redux";
import { fetchConfig } from "features/tmdb-config/tmdbConfigSlice";
import useSelector from "hooks/useSelector";

const Movies = () => {
  const tmdbConfig = useSelector(state => state.tmdbConfig);
  const dispatch = useDispatch();
  if (!tmdbConfig.config) {
    dispatch(fetchConfig());
  }
  return <p>'sup?</p>;
};

export default Movies;
