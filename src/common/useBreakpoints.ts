import { useLayoutEffect, useState } from "react";
import { findLastIndex } from "lodash-es";
import { useTheme } from "styles/theme";

const useBreakpoints = <T>(values: T[]) => {
  const {
    theme: { breakpoints },
  } = useTheme();
  const [breakpointIndex, setBreakpointIndex] = useState(0);

  useLayoutEffect(() => {
    const handleResize = () => {
      setBreakpointIndex(
        findLastIndex(
          breakpoints,
          (breakpoint) =>
            window.matchMedia(`(min-width: ${breakpoint})`).matches
        ) + 1
      );
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoints, setBreakpointIndex]);

  return values[
    breakpointIndex < values.length ? breakpointIndex : values.length - 1
  ];
};

export default useBreakpoints;
