import React, { useCallback, useEffect, useMemo, useRef } from "react";
import Node from "../node/Node";
import _ from "lodash";
import "./canvas.scss";
import { usePathVisualizerCanvasContext } from "../../context/PathVisualizerProvider";

const Canvas = () => {
  const {
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
    updateVisualization,
  } = usePathVisualizerCanvasContext()!;

  const currentDragHoverElement = useRef<number>();
  const drawWall = useRef<boolean>(false);

  useEffect(() => {
    updateVisualization();
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
      let updatedGraph;
      if (e.shiftKey) {
        updatedGraph = graph.addWeightToWall(idx);
      } else {
        updatedGraph = graph.changeNodeToWall(idx);
      }
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
    },
    []
  );

  return (
    <div className="Canvas" ref={canvasRef}>
      <div
        className="grid"
        style={{
          gridTemplateColumns: "30px ".repeat(cols),
          gridTemplateRows: "30px ".repeat(rows),
        }}
      >
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
    </div>
  );
};

export default Canvas;
