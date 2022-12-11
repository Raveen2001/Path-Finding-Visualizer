import _ from "lodash";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { CONSTANTS, ALGORITHMS } from "../constants";
import {
  GraphModel,
  IPathVisualizerCanvasContext,
  IPathVisualizerOptionsContext,
  NodeModel,
} from "../models";
import { showToast } from "../utils/toast";

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
  const [selectedAlgorithmIdx, setSelectedAlgorithmIdx] = useState<number>(-1);
  const [startNodeId, setStartNodeId] = useState<number>(
    _.random(0, CONSTANTS.totalNodes)
  );
  const [endNodeId, setEndNodeId] = useState<number>(
    _.random(0, CONSTANTS.totalNodes)
  );
  const [graph, setGraph] = useState<GraphModel>(
    new GraphModel(CONSTANTS.rows, CONSTANTS.cols)
  );
  const [path, setPath] = useState<NodeModel[]>([]);

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

  return (
    <PathVisualizerOptionsContext.Provider
      value={{
        algorithms: ALGORITHMS,
        selectedAlgorithmIdx,
        setSelectedAlgorithmIdx,
        startVisualization,
      }}
    >
      <PathVisualizerCanvasContext.Provider
        value={{
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
