export { GraphModel } from "./GraphModel";
export { NodeModel } from "./NodeModel";
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
  setSelectedAlgorithmIdx: TSetState<number>;
  startVisualization: () => void;
}

export interface IPathVisualizerCanvasContext {
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
