import _ from "lodash";

export class NodeModel {
  id: number;
  x: number;
  y: number;
  g: number;
  h: number;
  f: number;
  distance: number;
  adjacentNodes: NodeModel[];
  isWall: boolean;
  weight: number;
  isVisited: boolean;
  previousNode: NodeModel | null;
  animationLevel: number;

  public constructor(id: number, x: number, y: number) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.distance = Infinity;
    this.isVisited = false;
    this.adjacentNodes = [];
    this.isWall = false;
    this.weight = 1;
    this.animationLevel = 0;
    this.previousNode = null;
    this.g = Infinity;
    this.h = Infinity;
    this.f = Infinity;
  }

  public addAdjacentNode(node: NodeModel) {
    this.adjacentNodes.push(node);
  }

  public prepareNodeForAlgorithm() {
    this.distance = Infinity;
    this.animationLevel = 0;
    this.previousNode = null;
    this.isVisited = false;
    this.g = Infinity;
    this.h = Infinity;
    this.f = Infinity;
  }

  public update(
    previousNode: NodeModel,
    sourceNode: NodeModel,
    targetNode: NodeModel
  ) {
    const updatedDistance = previousNode.distance + this.weight;
    const updatedG = previousNode.g + this.weight;
    if (this.distance > updatedDistance) {
      this.distance = updatedDistance;
      this.previousNode = previousNode;
      this.isVisited = true;
      this.g = updatedG;
      this.h = this.calculateHvalue(targetNode);
      this.f = this.g + this.h;
    }
  }

  public calculateHvalue(targetNode: NodeModel): number {
    const h = Math.abs(this.x - targetNode.x) + Math.abs(this.y - targetNode.y);

    return h;
  }

  public setDistance(distance: number) {
    this.distance = distance;
    return this;
  }

  public changeToWall() {
    this.isWall = true;
    this.weight = 1;
    return this;
  }

  public setPreviousNode(node: NodeModel | null) {
    this.previousNode = node;
    return this;
  }

  public setAnimationLevel(level: number) {
    this.animationLevel = level;
    return this;
  }

  public addRandomWeight() {
    if (this.weight === 1) {
      this.weight = _.random(2, 10);
      this.isWall = false;
    }

    return this;
  }
}
