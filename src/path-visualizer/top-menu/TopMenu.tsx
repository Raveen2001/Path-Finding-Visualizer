import React, { useMemo } from "react";
import Select from "react-select";
import { usePathVisualizerOptionsContext } from "../../context/PathVisualizerProvider";
import "./TopMenu.scss";
import "../../theme.scss";

import ThemeSwitcher from "./theme-switcher/ThemeSwitcher";
import ActionButton from "./action-button/ActionButton";

import { ReactComponent as PlayIcon } from "../../assets/svg/play.svg";
import { ReactComponent as ProfileIcon } from "../../assets/svg/profile.svg";
import { ReactComponent as InfoIcon } from "../../assets/svg/info.svg";
import { ReactComponent as RefreshIcon } from "../../assets/svg/refresh.svg";
import { showToast } from "../../utils/toast";

const TopMenu = () => {
  const {
    algorithms,
    setSelectedAlgorithmIdx,
    startVisualization,
    startTour,
    resetCanvas,
  } = usePathVisualizerOptionsContext()!;

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
          id="algorithms"
          options={algorithmOptions}
          defaultValue={algorithmOptions[0]}
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

      <div className="actions">
        <ActionButton
          id="help"
          onClick={(e) => {
            startTour(e);
          }}
          icon={<InfoIcon />}
          label={"Help"}
        />
        <ActionButton
          id="profile"
          onClick={() => {
            window.open("raveen.in", "_blank", "noopener,noreferrer");
          }}
          icon={<ProfileIcon />}
          label={"Profile"}
        />
        <ActionButton
          id="reset"
          onClick={resetCanvas}
          icon={<RefreshIcon />}
          label={"Reset"}
        />
        <ActionButton
          id="play"
          onClick={startVisualization}
          icon={<PlayIcon />}
          label={"Play"}
        />
        <ThemeSwitcher id="theme" />
      </div>
    </div>
  );
};

export default TopMenu;
