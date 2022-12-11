import React from "react";
import Canvas from "./canvas/Canvas";
import "./PathVisualizer.scss";
import TopMenu from "./top-menu/TopMenu";
const PathVisualizer = () => {
  return (
    <div className="Path-Visualizer">
      <TopMenu />
      <Canvas />
    </div>
  );
};

export default PathVisualizer;
