import React from "react";
import cn from "classnames";
import { NodeModel } from "../../models/NodeModel";
import { ReactComponent as StartIcon } from "../../assets/start.svg";
import { ReactComponent as EndIcon } from "../../assets/finish.svg";
import "./Node.scss";

interface INode {
  node: NodeModel;
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
  isStartNode,
  isEndNode,
  onDragStart,
  onDragEnter,
  onDragEnd,
}) => {
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
          start: isStartNode,
          end: isEndNode,
          visited: Number.isFinite(node.distance),
          wall: node.isWall,
        })}
      >
        {isStartNode && <StartIcon fill="white" />}
        {isEndNode && <EndIcon fill="white" />}
      </div>
    </div>
  );
};

export default Node;
