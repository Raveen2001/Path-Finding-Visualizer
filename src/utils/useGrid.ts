import _ from "lodash";
import React, { useLayoutEffect, useState } from "react";

const useGrid = (ref: React.RefObject<HTMLDivElement>) => {
  const [grid, setGrid] = useState([0, 0]);
  useLayoutEffect(() => {
    const updateSize = () => {
      const width = ref.current?.clientWidth ?? 0;
      const height = ref.current?.clientHeight ?? 0;

      if (width >= 0 && height >= 0) {
        const rows = _.floor(height / 30) - 2;
        const cols = _.floor(width / 30) - 4;
        setGrid([rows, cols]);
        return;
      }

      setGrid([0, 0]);
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return grid;
};

export default useGrid;
