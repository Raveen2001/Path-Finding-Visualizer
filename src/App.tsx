import { ToastContainer } from "react-toastify";
import PathVisualizerProvider from "./context/PathVisualizerProvider";
import PathVisualizer from "./path-visualizer/PathVisualizer";
import "./App.scss";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <PathVisualizerProvider>
        <PathVisualizer />
      </PathVisualizerProvider>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        toastStyle={{ backgroundColor: "var(--primary-color)" }}
        progressStyle={{ backgroundColor: "var(--accent-color)" }}
        bodyStyle={{ color: "var(--color)" }}
        theme="colored"
        pauseOnHover
      />
    </div>
  );
}

export default App;
