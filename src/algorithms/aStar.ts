import { GraphModel, NodeModel } from "../models";

export const aStar = (
  graph: GraphModel,
  startId: number,
  endId: number
): [GraphModel, NodeModel[], number] => {
  const [startNode, endNode] = graph.prepareMatrixForAlgorithm(startId, endId);
  let path: NodeModel[] = [];
  const visitedNodes = new Set();
  let maxAnimationLevelReached = 0;
  let currentAnimationLevel = 0;

  if (startNode && endNode) {
    const queue = [startNode];
    visitedNodes.add(startNode.id);

    while (queue.length > 0) {
      const node = queue.shift() as NodeModel;

      node.animationLevel = currentAnimationLevel;
      currentAnimationLevel += 0.5;
      node.isVisited = true;

      maxAnimationLevelReached = currentAnimationLevel;
      if (node.id == endId) {
        let currentNode = node;
        while (currentNode.previousNode != null) {
          path.unshift(currentNode);
          currentNode = currentNode.previousNode;
        }
        break;
      }

      node.adjacentNodes.forEach((adjacentNode) => {
        if (!adjacentNode.isWall && !visitedNodes.has(adjacentNode.id)) {
          adjacentNode.update(node, startNode, endNode);
          adjacentNode.isVisited = false;
          visitedNodes.add(adjacentNode.id);
          queue.push(adjacentNode);
        }
      });
      queue.sort((a, b) => a.h - b.h);
    }
  }
  return [graph.clone(), path, maxAnimationLevelReached];
};
