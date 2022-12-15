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

  if (startNode && endNode) {
    const queue = [startNode];

    while (queue.length > 0) {
      const node = queue.shift() as NodeModel;
      maxAnimationLevelReached = node.animationLevel;
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
          adjacentNode.update(node, endNode);
          visitedNodes.add(adjacentNode.id);
          queue.push(adjacentNode);
        }
      });
      queue.sort((a, b) => a.distance - b.distance);
    }
  }
  return [graph.clone(), path, maxAnimationLevelReached];
};
