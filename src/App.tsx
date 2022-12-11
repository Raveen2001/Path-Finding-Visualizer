import { ToastContainer } from "react-toastify";
import PathVisualizerProvider from "./context/PathVisualizerProvider";
import PathVisualizer from "./path-visualizer/PathVisualizer";
import "react-toastify/dist/ReactToastify.css";
import { COLORS, CONSTANTS } from "./constants";

function App() {
  return (
    <div className="App">
      <PathVisualizerProvider>
        <PathVisualizer />
      </PathVisualizerProvider>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        toastStyle={{ backgroundColor: COLORS.bgDark }}
        progressStyle={{ backgroundColor: COLORS.accentColor }}
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
