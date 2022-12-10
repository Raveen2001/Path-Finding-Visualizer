export class NodeModel {
  id: number;
  distance: number;
  adjacentNodes: NodeModel[];
  isWall: boolean;

  public constructor(id: number) {
    this.id = id;
    this.distance = NaN;
    this.adjacentNodes = [];
    this.isWall = false;
  }

  public addAdjacentNode(node: NodeModel) {
    this.adjacentNodes.push(node);
    return this;
  }

  public clearAdjacentNodes() {
    this.adjacentNodes = [];
  }

  public changeDistance(distance: number) {
    this.distance = distance;
  }

  public changeToWall() {
    this.isWall = true;
  }
}
