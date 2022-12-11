import { useEffect } from "react";
import PathVisualizerProvider from "./context/PathVisualizerProvider";
import PathVisualizer from "./path-visualizer/PathVisualizer";

function App() {
  return (
    <div className="App">
      <PathVisualizerProvider>
        <PathVisualizer />
      </PathVisualizerProvider>
    </div>
  );
}

export default App;
