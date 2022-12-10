import React, { useEffect, useRef } from "react";
import cn from "classnames";
import { NodeModel } from "../../models/NodeModel";
import { ReactComponent as StartIcon } from "../../assets/start.svg";
import { ReactComponent as EndIcon } from "../../assets/finish.svg";
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
  const isFirstRender = useRef<boolean>(true);

  useEffect(() => {
    // if (node.id === 0) console.log("hello");
    const isNodeVisited = Number.isFinite(node.distance);
    nodeRef.current?.classList.remove("visited");
    let timeoutId: number | undefined = undefined;
    if (isNodeVisited) {
      const time = node.animationLevel * 100;
      timeoutId = setTimeout(() => {
        nodeRef.current?.classList.add("visited");
      }, time);
    }

    isFirstRender.current = false;

    return () => clearTimeout(timeoutId);
  }, [path.length]);

  // useEffect(() => {
  //   if (isFirstRender.current) return;

  //   const isNodeVisited = Number.isFinite(node.distance);
  //   if (isNodeVisited) {
  //     nodeRef.current?.classList.add("visited");
  //   } else {
  //     nodeRef.current?.classList.remove("visited");
  //   }
  // }, [node.distance]);

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
          // visited: Number.isFinite(node.distance),
          "path-node": path.includes(node),
          wall: node.isWall,
          end: isEndNode,
          start: isStartNode,
        })}
        ref={nodeRef}
      >
        {isStartNode && <StartIcon fill="white" />}
        {isEndNode && <EndIcon fill="white" />}
      </div>
    </div>
  );
};

export default Node;
