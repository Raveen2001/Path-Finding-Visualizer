import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Node from "./node/Node";
import _ from "lodash";
import "./PathVisualizer.scss";
import { GraphModel, NodeModel } from "../models";
import { dijkstra } from "../algorithms/dijkstra";

const row = 20;
const col = 30;
const PathVisualizer = () => {
  const [reRenderCounter, setReRenderCounter] = useState<number>(0);
  const [startNodeId, setStartNodeId] = useState<number>(15);
  const [endNodeId, setEndNodeId] = useState<number>(row * col - 20);

  const [graph, setGraph] = useState<GraphModel>(new GraphModel(row, col));
  const [path, setPath] = useState<NodeModel[]>([]);
  const currentDragHoverElement = useRef<number>();
  const drawWall = useRef(false);

  useEffect(() => {
    let [updatedGraph, path] = dijkstra(graph, startNodeId, endNodeId);
    setReRenderCounter((value) => value + 1);
    setPath(path);
  }, [startNodeId, endNodeId]);

  const onDragStart = useCallback(
    (e: React.DragEvent, isStartNode?: boolean, isEndNode?: boolean) => {
      if (isStartNode || isEndNode) drawWall.current = false;
      else drawWall.current = true;
    },
    []
  );

  const onDragEnter = useCallback((e: React.DragEvent, idx: number) => {
    if (drawWall.current) {
      const updatedGraph = graph.changeNodeToWall(idx);
    } else {
      currentDragHoverElement.current = idx;
    }
  }, []);

  const onDragEnd = useCallback(
    (
      e: React.DragEvent,
      isStartNodeChanged?: boolean,
      isEndNodeChanged?: boolean
    ) => {
      if (drawWall.current) return;

      const updatedId = currentDragHoverElement.current;
      if (updatedId === undefined) return;

      if (isStartNodeChanged) {
        if (updatedId < endNodeId) {
          setStartNodeId(updatedId);
        }
      }

      if (isEndNodeChanged) {
        if (updatedId > startNodeId) {
          setEndNodeId(updatedId);
        }
      }

      const updatedGraph = graph.changeDistanceOfNode(updatedId - 1, 2);
      if (updatedGraph) setGraph(updatedGraph);

      currentDragHoverElement.current = undefined;
      drawWall.current = false;
    },
    []
  );

  return (
    <div className="Path-Visualizer">
      <div className="canvas">
        {graph.matrix.map((row) =>
          row.map((node) => (
            <Node
              key={`${node.id}`}
              node={node}
              path={path}
              isStartNode={node.id === startNodeId}
              isEndNode={node.id === endNodeId}
              onDragStart={onDragStart}
              onDragEnter={onDragEnter}
              onDragEnd={onDragEnd}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default PathVisualizer;
