import React, { useCallback, useEffect, useRef } from "react";
import Node from "../node/Node";
import _ from "lodash";
import "./canvas.scss";
import { dijkstra } from "../../algorithms/dijkstra";
import { usePathVisualizerCanvasContext } from "../../context/PathVisualizerProvider";

const Canvas = () => {
  const {
    startNodeId,
    setStartNodeId,
    endNodeId,
    setEndNodeId,
    graph,
    setGraph,
    path,
    setPath,
  } = usePathVisualizerCanvasContext()!;

  const currentDragHoverElement = useRef<number>();
  const drawWall = useRef(false);

  useEffect(() => {
    let [updatedGraph, path] = dijkstra(graph, startNodeId, endNodeId);
    setGraph(updatedGraph);
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
        if (updatedId !== endNodeId) {
          setStartNodeId(updatedId);
        }
      }

      if (isEndNodeChanged) {
        if (updatedId !== startNodeId) {
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
    <div className="Canvas">
      {graph.matrix.map((row) =>
        row.map((node) => (
          <Node
            key={`node-${node.id}`}
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
  );
};

export default Canvas;
