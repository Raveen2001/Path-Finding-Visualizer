export { GraphModel } from "./GraphModel";
export { NodeModel } from "./NodeModel";
import React from "react";
import { CallBackProps } from "react-joyride";
import { GraphModel, NodeModel } from ".";

export type TAlgorithm = {
  name: string;
  fn: (
    graph: GraphModel,
    startNodeId: number,
    endNodeId: number
  ) => [GraphModel, NodeModel[], number];
};

export type TSetState<T> = (val: T) => void;

export interface IPathVisualizerOptionsContext {
  algorithms: TAlgorithm[];
  selectedAlgorithmIdx: number;
  showTour: boolean;
  setShowTour: TSetState<boolean>;
  setSelectedAlgorithmIdx: TSetState<number>;
  handleTourCallback: (data: CallBackProps) => void;
  startTour: (e: React.MouseEvent<HTMLElement>) => void;
  startVisualization: () => void;
}

export interface IPathVisualizerCanvasContext {
  canvasRef: React.RefObject<HTMLDivElement>;
  rows: number;
  cols: number;

  startNodeId: number;
  setStartNodeId: TSetState<number>;

  endNodeId: number;
  setEndNodeId: TSetState<number>;

  graph: GraphModel;
  setGraph: TSetState<GraphModel>;

  path: NodeModel[];
  setPath: TSetState<NodeModel[]>;

  updateVisualization: () => void;
}
