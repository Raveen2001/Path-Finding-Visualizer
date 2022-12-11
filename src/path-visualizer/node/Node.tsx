import React, { useEffect, useRef, useState } from "react";
import cn from "classnames";
import { NodeModel } from "../../models/NodeModel";
import { ReactComponent as StartIcon } from "../../assets/svg/start.svg";
import { ReactComponent as EndIcon } from "../../assets/svg/finish.svg";
import { ReactComponent as PathIcon } from "../../assets/svg/path-node.svg";
import "./Node.scss";

interface INode {
  node: NodeModel;
  path: NodeModel[];
  onDragStart: (
    e: React.DragEvent,
    isStartNode?: boolean,
    isEndNode?: boolean
  ) => void;
  onDragEnter: (e: React.DragEvent, idx: number) => void;
  onDragEnd: (
    e: React.DragEvent,
    isStartNodeChanged?: boolean,
    isEndNodeChanged?: boolean
  ) => void;
  isStartNode?: boolean;
  isEndNode?: boolean;
}

const Node: React.FC<INode> = ({
  node,
  path,
  isStartNode,
  isEndNode,
  onDragStart,
  onDragEnter,
  onDragEnd,
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
    const timeoutIds: number[] = [];

    if (isNodeVisited && !isStartNode && !isEndNode) {
      const time = node.animationLevel * 100;
      console.log("timeout assigned", time);
      let timeoutId = setTimeout(() => {
        nodeRef.current?.classList.add("spread-animation");
        console.log("animation start");
      }, time);

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
      onDragStart={(e) => onDragStart(e, isStartNode, isEndNode)}
      onDragOver={(e) => e.preventDefault()}
      onDragEnterCapture={(e) => onDragEnter(e, node.id)}
      onDragEnd={(e) => onDragEnd(e, isStartNode, isEndNode)}
      draggable
    >
      <div
        className={cn("bg", {
          wall: node.isWall,
          end: isEndNode,
          start: isStartNode,
        })}
        id={`node-${node.id}`}
        ref={nodeRef}
      >
        {isStartNode && <StartIcon fill="#282a36" />}
        {isEndNode && <EndIcon fill="#282a36" />}
      </div>
    </div>
  );
};

export default Node;
