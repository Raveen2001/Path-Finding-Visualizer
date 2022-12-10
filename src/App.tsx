import { useEffect } from "react";
import "./App.scss";
import PathVisualizer from "./path-visualizer/PathVisualizer";

function App() {
  return <div className="App">{<PathVisualizer />}</div>;
}

export default App;
