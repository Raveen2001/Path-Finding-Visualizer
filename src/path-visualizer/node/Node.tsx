import React, { useEffect, useRef, useState } from "react";
import cn from "classnames";
import { NodeModel } from "../../models/NodeModel";
import { ReactComponent as StartIcon } from "../../assets/svg/start.svg";
import { ReactComponent as EndIcon } from "../../assets/svg/end.svg";
import "./Node.scss";
import Beacon from "./beacon/Beacon";

interface INode {
  node: NodeModel;
  path: NodeModel[];
  onDragStart?: (
    e: React.DragEvent,
    isStartNode?: boolean,
    isEndNode?: boolean
  ) => void;
  onDragEnter?: (
    e: React.DragEvent,
    idx: number,
    isStartNode?: boolean,
    isEndNode?: boolean
  ) => void;
  onDragEnd?: (
    e: React.DragEvent,
    isStartNodeChanged?: boolean,
    isEndNodeChanged?: boolean
  ) => void;
  isStartNode?: boolean;
  isEndNode?: boolean;
  [key: string]: any;
}

const Node: React.FC<INode> = ({
  node,
  path,
  isStartNode,
  isEndNode,
  onDragStart,
  onDragEnter,
  onDragEnd,
  ...props
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // clear all animations
    nodeRef.current?.classList.remove(
      "path-node",
      "spread-animation",
      "path-animation"
    );

    const isNodeVisited = Number.isFinite(node.distance);
    const isWeightedNode = node.weight > 1;
    const timeoutIds: number[] = [];

    if (isNodeVisited && !isStartNode && !isEndNode) {
      const time = node.animationLevel * 100;
      let timeoutId;
      if (isWeightedNode) {
        timeoutId = setTimeout(() => {
          nodeRef.current?.classList.add("weighted-animation");
        }, time);

        let timeoutId2 = setTimeout(() => {
          nodeRef.current?.classList.remove("weighted-animation");
        }, time + 200);

        timeoutIds.push(timeoutId2);
      } else {
        timeoutId = setTimeout(() => {
          nodeRef.current?.classList.add("spread-animation");
        }, time);
      }
      timeoutIds.push(timeoutId);

      if (path.includes(node)) {
        const timeForSpreadAnimation =
          path[path.length - 1].animationLevel * 100 + 1500;
        const pathTime = timeForSpreadAnimation + node.animationLevel * 100;

        let timeoutId = setTimeout(() => {
          nodeRef.current?.classList.add("path-node", "path-animation");
        }, pathTime);

        timeoutIds.push(timeoutId);
      }
    }

    return () => {
      timeoutIds.map((id) => clearTimeout(id));
    };
  }, [isStartNode, isEndNode, path]);

  return (
    <div
      className="Node"
      onDragStart={(e) => onDragStart?.(e, isStartNode, isEndNode)}
      onDragOver={(e) => e.preventDefault()}
      onDragEnterCapture={(e) =>
        onDragEnter?.(e, node.id, isStartNode, isEndNode)
      }
      onDragEnd={(e) => onDragEnd?.(e, isStartNode, isEndNode)}
      draggable
      {...props}
    >
      <div
        className={cn("bg", {
          wall: node.isWall,
          weighted: node.weight > 1,
          // end: isEndNode,
          // start: isStartNode,
        })}
        id={`node-${node.id}`}
        ref={nodeRef}
      >
        {isStartNode && <Beacon color="var(--node-start-color)" />}
        {isEndNode && <Beacon color="var(--node-end-color)" />}
        {node.weight > 1 && <span>{node.weight}</span>}
      </div>
    </div>
  );
};

export default Node;
