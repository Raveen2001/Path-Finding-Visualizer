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
import { GraphModel } from "../models";

const row = 20;
const col = 30;
const PathVisualizer = () => {
  const [startNodeId, setStartNodeId] = useState<number>(15);
  const [endNodeId, setEndNodeId] = useState<number>(row * col - 20);

  const [graph, setGraph] = useState<GraphModel>(new GraphModel(row, col));
  const currentDragHoverElement = useRef<number>();
  const drawWall = useRef(false);

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
      if (updatedGraph) setGraph(updatedGraph);
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
        {graph.graphMatrix.map((row) =>
          row.map((node) => (
            <Node
              node={node}
              key={node.id}
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
