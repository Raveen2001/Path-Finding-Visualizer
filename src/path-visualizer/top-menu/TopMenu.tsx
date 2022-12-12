import React, { useMemo } from "react";
import Select from "react-select";
import { usePathVisualizerOptionsContext } from "../../context/PathVisualizerProvider";
import "react-toggle/style.css";
import "./TopMenu.scss";
import "../../theme.scss";

import ThemeSwitcher from "../theme-switcher/ThemeSwitcher";

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
    <div className={"Top-Menu"}>
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
              primary25: "var(--hover-color)",
              primary50: "var(--hold-down-color)",
              primary: "var(--accent-color)",
              neutral0: "var(--secondary-color)",
              neutral80: "var(--color)",
              neutral60: "var(--color)",
            },
          })}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              width: 300,
              transition: "all 0.2s ease",
            }),
          }}
          placeholder="Select an algorithm"
        ></Select>
      </div>

      <ThemeSwitcher />

      <button className="start-visualization-btn" onClick={startVisualization}>
        Start Visualization
      </button>
    </div>
  );
};

export default TopMenu;
