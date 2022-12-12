import React, { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import { COLORS } from "../../constants";
import { usePathVisualizerOptionsContext } from "../../context/PathVisualizerProvider";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import "./TopMenu.scss";
import "../../theme.scss";

const TopMenu = () => {
  const { algorithms, setSelectedAlgorithmIdx, startVisualization } =
    usePathVisualizerOptionsContext()!;

  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);

  const algorithmOptions = useMemo(
    () =>
      algorithms.map((algorithm, idx) => ({
        label: algorithm.name,
        value: idx,
      })),
    [algorithms]
  );

  // change theme
  useEffect(() => {
    document.body.classList.remove("dark", "light");

    if (isDarkTheme) document.body.classList.add("dark");
    else document.body.classList.add("light");
  }, [isDarkTheme]);

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
              primary25: COLORS.hoverColor,
              primary50: COLORS.holdDownColor,
              primary: COLORS.accentColor,
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

      <div style={{ width: "min-content" }}>
        <label htmlFor="">
          <Toggle
            defaultChecked={isDarkTheme}
            icons={{
              checked: null,
              unchecked: null,
            }}
            onChange={() => {
              setIsDarkTheme(!isDarkTheme);
            }}
          />
        </label>
      </div>

      <button className="start-visualization-btn" onClick={startVisualization}>
        Start Visualization
      </button>
    </div>
  );
};

export default TopMenu;
