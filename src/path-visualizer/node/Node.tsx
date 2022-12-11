import React, { useEffect, useRef, useState } from "react";
import cn from "classnames";
import { NodeModel } from "../../models/NodeModel";
import { ReactComponent as StartIcon } from "../../assets/svg/start.svg";
import { ReactComponent as EndIcon } from "../../assets/svg/finish.svg";
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
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);

  // useEffect(() => {
  //   console.log(isFirstRender);
  //   if (isFirstRender) return;
  //   const isNodeVisited = Number.isFinite(node.distance);
  //   if (isNodeVisited) {
  //     nodeRef.current?.classList.add("visited");
  //   } else {
  //     nodeRef.current?.classList.remove("visited");
  //   }
  // }, [path.join(",")]);

  useEffect(() => {
    if (node.id === 0) console.log("creating", isFirstRender);
    const isNodeVisited = Number.isFinite(node.distance);
    nodeRef.current?.classList.remove("visited");
    let timeoutId: number | undefined = undefined;
    if (isNodeVisited) {
      const time = node.animationLevel * 100;
      timeoutId = setTimeout(() => {
        nodeRef.current?.classList.add("visited");

        setIsFirstRender(false);

        console.log("first render completed");
      }, time);
    } else {
      setIsFirstRender(false);
    }

    return () => {
      if (node.id === 0) console.log("destroying");
      clearTimeout(timeoutId);
      setIsFirstRender(true);
    };
  }, [path.join(",")]);

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
