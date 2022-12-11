import _ from "lodash";
import React, { createContext, useContext, useState } from "react";
import { CONSTANTS, ALGORITHMS } from "../constants";
import {
  GraphModel,
  IPathVisualizerCanvasContext,
  IPathVisualizerOptionsContext,
  NodeModel,
} from "../models";

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

  return (
    <PathVisualizerOptionsContext.Provider
      value={{
        algorithms: ALGORITHMS,
        selectedAlgorithmIdx,
        setSelectedAlgorithmIdx,
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
        }}
      >
        {children}
      </PathVisualizerCanvasContext.Provider>
    </PathVisualizerOptionsContext.Provider>
  );
};

export default PathVisualizerProvider;
