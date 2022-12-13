import _ from "lodash";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ALGORITHMS } from "../constants";
import {
  GraphModel,
  IPathVisualizerCanvasContext,
  IPathVisualizerOptionsContext,
  NodeModel,
} from "../models";
import useGrid from "../utils/useGrid";
import { showToast } from "../utils/toast";
import { CallBackProps, STATUS } from "react-joyride";

const PathVisualizerOptionsContext =
  createContext<IPathVisualizerOptionsContext | null>(null);
const PathVisualizerCanvasContext =
  createContext<IPathVisualizerCanvasContext | null>(null);

export const usePathVisualizerOptionsContext = () =>
  useContext(PathVisualizerOptionsContext);

export const usePathVisualizerCanvasContext = () =>
  useContext(PathVisualizerCanvasContext);

interface IPathVisualizerProvider {
  children: React.ReactNode;
}

const PathVisualizerProvider: React.FC<IPathVisualizerProvider> = ({
  children,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [rows, cols] = useGrid(canvasRef);

  const [selectedAlgorithmIdx, setSelectedAlgorithmIdx] = useState<number>(-1);
  const [startNodeId, setStartNodeId] = useState<number>(0);
  const [endNodeId, setEndNodeId] = useState<number>(0);
  const [graph, setGraph] = useState<GraphModel>(new GraphModel(0, 0));
  const [path, setPath] = useState<NodeModel[]>([]);

  const [showTour, setShowTour] = useState(true);

  useEffect(() => {
    setGraph(new GraphModel(rows, cols));
    setStartNodeId(_.random(0, rows * cols));
    setEndNodeId(_.random(0, rows * cols));
  }, [rows, cols]);

  const startVisualization = useCallback(() => {
    if (selectedAlgorithmIdx < 0 || selectedAlgorithmIdx >= ALGORITHMS.length) {
      showToast("Please select an algorithm");
      return;
    }
    const algorithm = ALGORITHMS[selectedAlgorithmIdx].fn;
    let [updatedGraph, path, maxAnimationLevel] = algorithm(
      graph,
      startNodeId,
      endNodeId
    );
    setGraph(updatedGraph);
    setPath(path);

    if (path.length === 0)
      setTimeout(
        () => showToast("No path found"),
        maxAnimationLevel * 100 + 1000
      );
  }, [selectedAlgorithmIdx, startNodeId, endNodeId, graph]);

  const updateVisualization = useCallback(() => {
    if (selectedAlgorithmIdx < 0 || selectedAlgorithmIdx >= ALGORITHMS.length) {
      return;
    }

    startVisualization();
  }, [selectedAlgorithmIdx, startVisualization]);

  const handleTourCallback = (data: CallBackProps) => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setShowTour(false);
    }
  };

  const startTour = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    setShowTour(true);
  };
  return (
    <PathVisualizerOptionsContext.Provider
      value={{
        algorithms: ALGORITHMS,
        selectedAlgorithmIdx,
        setSelectedAlgorithmIdx,
        showTour,
        setShowTour,
        startTour,
        handleTourCallback,
        startVisualization,
      }}
    >
      <PathVisualizerCanvasContext.Provider
        value={{
          canvasRef,
          rows,
          cols,
          startNodeId,
          setStartNodeId,
          endNodeId,
          setEndNodeId,
          graph,
          setGraph,
          path,
          setPath,
          updateVisualization,
        }}
      >
        {children}
      </PathVisualizerCanvasContext.Provider>
    </PathVisualizerOptionsContext.Provider>
  );
};

export default PathVisualizerProvider;
