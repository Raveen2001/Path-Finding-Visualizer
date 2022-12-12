import { ToastContainer } from "react-toastify";
import PathVisualizerProvider from "./context/PathVisualizerProvider";
import PathVisualizer from "./path-visualizer/PathVisualizer";
import "react-toastify/dist/ReactToastify.css";
import { ReactComponent as CloseIcon } from "./assets/svg/close.svg";

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
        closeButton={<CloseIcon fill="var(--color)" width={16} height={16} />}
        theme="colored"
        pauseOnHover
      />
    </div>
  );
}

export default App;
