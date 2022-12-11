import React, { useEffect, useMemo } from "react";
import Select from "react-select";
import { COLORS } from "../../constants";
import { usePathVisualizerOptionsContext } from "../../context/PathVisualizerProvider";
import "./TopMenu.scss";

const TopMenu = () => {
  const { algorithms, setSelectedAlgorithmIdx, startVisualization } =
    usePathVisualizerOptionsContext()!;

  const algorithmOptions = useMemo(
    () =>
      algorithms.map((algorithm, idx) => ({
        label: algorithm.name,
        value: idx,
      })),
    [algorithms]
  );

  return (
    <div className="Top-Menu">
      <div className="logo">
        <img src="./visual-thinking.png" width={"30px"} height={"30px"} />
        <h2>Path Finding Visualizer</h2>
      </div>
      <div className="menu">
        <Select
          options={algorithmOptions}
          onChange={(newValue) => {
            setSelectedAlgorithmIdx(newValue?.value ?? -1);
          }}
          theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              primary25: COLORS.hoverColor,
              primary50: COLORS.holdDownColor,
              primary: COLORS.textColor,
              neutral0: COLORS.bgLight,
              neutral80: COLORS.darkWhite,
              neutral60: COLORS.white,
            },
          })}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              width: 300,
            }),
          }}
          placeholder="Select an algorithm"
        ></Select>
      </div>
      <button className="start-visualization-btn" onClick={startVisualization}>
        Start Visualization
      </button>
    </div>
  );
};

export default TopMenu;
