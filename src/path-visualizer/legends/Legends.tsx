import React, { useEffect, useMemo, useState } from "react";
import { NodeModel } from "../../models";
import Node from "../node/Node";
import "./Legends.scss";

const Legends = () => {
  const visitedNode = useMemo(() => new NodeModel(-1, 0, 0).setDistance(1), []);
  const pathNode = useMemo(() => new NodeModel(-1, 0, 0).setDistance(1), []);
  const node = useMemo(() => new NodeModel(-1, 0, 0), []);
  const wallNode = useMemo(() => new NodeModel(-1, 0, 0).changeToWall(), []);
  const weightedNode = useMemo(
    () => new NodeModel(-1, 0, 0).addRandomWeight(),
    []
  );
  const path = useMemo(() => [pathNode], []);
  const emptyPath = useMemo(() => [], []);

  const [reRender, triggerRender] = useState<boolean>(false);

  useEffect(() => {
    const id = setInterval(() => {
      triggerRender((v) => !v);
    }, 3000);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="Legends">
      <div className="legend">
        <Node node={node} path={emptyPath} />
        <span>Node</span>
      </div>
      <div className="legend">
        <Node node={pathNode} path={emptyPath} isStartNode />
        <span>Starting Node</span>
      </div>
      <div className="legend">
        <Node node={pathNode} path={emptyPath} isEndNode />
        <span>Ending Node</span>
      </div>
      <div className="legend">
        <Node node={pathNode} path={path} />
        <span>Path Node</span>
      </div>
      <div className="legend">
        <Node node={visitedNode} path={path} key={reRender ? 1 : 0} />
        <span>Visiting Node</span>
      </div>
      <div className="legend">
        <Node node={wallNode} path={emptyPath} />
        <span>Wall Node</span>
      </div>
      <div className="legend">
        <Node node={weightedNode} path={emptyPath} />
        <span>Weighted Node</span>
      </div>
    </div>
  );
};

export default Legends;
