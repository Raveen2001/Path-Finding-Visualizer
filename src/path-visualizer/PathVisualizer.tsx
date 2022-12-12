import _ from "lodash";
import React, { useEffect } from "react";
import Canvas from "./canvas/Canvas";
import Legends from "./legends/Legends";
import "./PathVisualizer.scss";
import TopMenu from "./top-menu/TopMenu";
const PathVisualizer = () => {
  return (
    <div className="Path-Visualizer">
      <TopMenu />
      <Canvas />
      <Legends />
    </div>
  );
};

export default PathVisualizer;
