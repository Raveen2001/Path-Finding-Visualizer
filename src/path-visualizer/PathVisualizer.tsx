import React, { useEffect, useMemo, useRef, useState } from "react";
import Node from "./node/Node";
import _ from "lodash";
import "./PathVisualizer.scss";
import { GraphModel } from "../models";

const row = 20;
const col = 30;
const PathVisualizer = () => {
  const currentDragHoverElement = useRef<number>();

  const [startNodeId, setStartNodeId] = useState<number>(15);
  const [endNodeId, setEndNodeId] = useState<number>(row * col - 20);

  const [graph, setGraph] = useState(new GraphModel(row, col));

  const onDragEnter = (idx: number) => {
    currentDragHoverElement.current = idx;
  };

  const onDragEnd = (
    isStartNodeChanged?: boolean,
    isEndNodeChanged?: boolean
  ) => {
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

    const updatedGraph = graph.changeDistanceOfNode(updatedId, 2);
    if (updatedGraph) setGraph(updatedGraph);

    currentDragHoverElement.current = undefined;
  };

  return (
    <div className="Path-Visualizer">
      <div className="canvas">
        {graph.graphMatrix.map((row) =>
          row.map((node) => (
            <Node
              node={node}
              key={node.id}
              isEndNode={node.id === endNodeId}
              isStartNode={node.id === startNodeId}
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
