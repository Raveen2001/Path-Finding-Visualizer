import React from "react";
import cn from "classnames";
import { NodeModel } from "../../models/NodeModel";
import { ReactComponent as StartIcon } from "../../assets/start.svg";
import { ReactComponent as EndIcon } from "../../assets/finish.svg";
import "./Node.scss";

interface INode {
  node: NodeModel;
  onDragEnter: (idx: number) => void;
  onDragEnd: (isStartNodeChanged?: boolean, isEndNodeChanged?: boolean) => void;
  isStartNode?: boolean;
  isEndNode?: boolean;
}

const Node: React.FC<INode> = ({
  node,
  isStartNode,
  isEndNode,
  onDragEnter,
  onDragEnd,
}) => {
  return (
    <div
      className="Node"
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={(e) => onDragEnter(node.id)}
      onDragEnd={(e) => onDragEnd(isStartNode, isEndNode)}
    >
      <div className={cn("bg", { start: isStartNode, end: isEndNode })}>
        <div draggable>
          {isStartNode && <StartIcon fill="white" />}
          {isEndNode && <EndIcon fill="white" />}
        </div>
      </div>
    </div>
  );
};

export default Node;
