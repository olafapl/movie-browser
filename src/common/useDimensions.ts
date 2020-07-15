import { useState, useLayoutEffect, useCallback, RefObject } from "react";

const useDimensions = (ref: RefObject<HTMLElement>) => {
  const current = ref.current;
  const getDimensions = useCallback(
    () => ({
      width: current?.clientWidth ?? 0,
      height: current?.clientHeight ?? 0,
    }),
    [current]
  );

  const [dimensions, setDimensions] = useState(getDimensions());
  useLayoutEffect(() => {
    const handleResize = () => {
      setDimensions(getDimensions());
    };

    if (current) {
      setDimensions(getDimensions());
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [current, getDimensions]);

  return dimensions;
};

export default useDimensions;
