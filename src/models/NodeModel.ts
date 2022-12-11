export class NodeModel {
  id: number;
  distance: number;
  adjacentNodes: NodeModel[];
  isWall: boolean;
  weight: number;
  previousNode: NodeModel | null;
  animationLevel: number;

  public constructor(id: number) {
    this.id = id;
    this.distance = Infinity;
    this.adjacentNodes = [];
    this.isWall = false;
    this.weight = 1;
    this.animationLevel = 0;
    this.previousNode = null;
  }

  public addAdjacentNode(node: NodeModel) {
    this.adjacentNodes.push(node);
  }

  public update(previousNode: NodeModel) {
    const updatedDistance = previousNode.distance + this.weight;
    if (this.distance > updatedDistance) {
      this.distance = updatedDistance;
      this.previousNode = previousNode;
      this.animationLevel = previousNode.animationLevel + 1;
    }
  }

  public setDistance(distance: number) {
    this.distance = distance;
  }

  public changeToWall() {
    this.isWall = true;
  }

  public setPreviousNode(node: NodeModel | null) {
    this.previousNode = node;
  }

  public setAnimationLevel(level: number) {
    this.animationLevel = level;
  }
}
