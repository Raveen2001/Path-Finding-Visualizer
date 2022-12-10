export class NodeModel {
  id: number;
  distance: number;
  adjacentNodes: NodeModel[];

  public constructor(id: number) {
    this.id = id;
    this.distance = NaN;
    this.adjacentNodes = [];
  }

  public addAdjacentNode(node: NodeModel) {
    this.adjacentNodes.push(node);
  }

  public changeDistance(distance: number) {
    this.distance = distance;
  }
}
