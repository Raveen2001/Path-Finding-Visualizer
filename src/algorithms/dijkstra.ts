import { GraphModel, NodeModel } from "../models";

export const dijkstra = (
  graph: GraphModel,
  startId: number,
  endId: number
): [GraphModel, NodeModel[]] => {
  const startNode = graph.prepareMatrixForAlgorithm(startId);
  let path: NodeModel[] = [];
  const visitedNodes = new Set();

  if (startNode) {
    const queue = [startNode];

    while (queue.length > 0) {
      const node = queue.shift() as NodeModel;
      if (node.id == endId) {
        let targetNode = node;
        // targetNode.update(node);
        while (targetNode.previousNode != null) {
          path.push(targetNode);
          targetNode = targetNode.previousNode;
        }
        path = path.reverse();
        break;
      }

      node.adjacentNodes.forEach((adjacentNode) => {
        if (!adjacentNode.isWall && !visitedNodes.has(adjacentNode.id)) {
          adjacentNode.update(node);
          visitedNodes.add(adjacentNode.id);
          queue.push(adjacentNode);
        }
      });
      queue.sort((a, b) => a.distance - b.distance);
    }
  }

  return [graph.clone(), path];
};
