import { NodeModel } from ".";
import _ from "lodash";

export class GraphModel {
  matrix: NodeModel[][];

  public constructor(row: number, col: number) {
    this.matrix = this.buildGraph(row, col);
  }

  private getNodePosition(id: number): number[] | null {
    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = 0; j < this.matrix[0].length; j++) {
        if (this.matrix[i][j].id == id) {
          return [i, j];
        }
      }
    }
    return null;
  }

  public changeDistanceOfNode(id: number, distance: number) {
    const nodePosition = this.getNodePosition(id);
    if (nodePosition === null) return;

    const [rowIdx, colIdx] = nodePosition;

    const node = this.matrix[rowIdx][colIdx];
    node.setDistance(distance);

    return this.clone();
  }

  public changeNodeToWall(id: number) {
    const nodePosition = this.getNodePosition(id);
    if (nodePosition === null) return;

    const [rowIdx, colIdx] = nodePosition;

    const node = this.matrix[rowIdx][colIdx];

    node.changeToWall();
    return this.clone();
  }

  public addWeightToWall(id: number) {
    const nodePosition = this.getNodePosition(id);
    if (nodePosition === null) return;

    const [rowIdx, colIdx] = nodePosition;

    const node = this.matrix[rowIdx][colIdx];
    node.addRandomWeight();

    return this.clone();
  }

  public prepareMatrixForAlgorithm(startId: number): NodeModel | null {
    let startNode = null;

    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = 0; j < this.matrix[0].length; j++) {
        const isStartingNode = this.matrix[i][j].id == startId;
        if (isStartingNode) {
          this.matrix[i][j].setDistance(0);
          startNode = this.matrix[i][j];
        } else {
          this.matrix[i][j].setDistance(Infinity);
        }

        this.matrix[i][j].setPreviousNode(null);
        this.matrix[i][j].setAnimationLevel(0);
      }
    }

    return startNode;
  }

  private buildGraph(row: number, col: number) {
    const matrix = _.range(row).map((row_idx) => {
      return _.range(col).map(
        (col_idx) => new NodeModel(row_idx * col + col_idx)
      );
    });

    matrix.forEach((row, rowIdx) => {
      row.forEach((node, colIdx) => {
        this.addAdjacentNodes(node, rowIdx, colIdx, matrix);
      });
    });

    return matrix;
  }

  private addAdjacentNodes(
    node: NodeModel,
    rowIdx: number,
    colIdx: number,
    matrix: NodeModel[][]
  ) {
    if (rowIdx >= 1) {
      node.addAdjacentNode(matrix[rowIdx - 1][colIdx]);
    }

    if (colIdx >= 1) {
      node.addAdjacentNode(matrix[rowIdx][colIdx - 1]);
    }

    if (rowIdx < matrix.length - 1) {
      node.addAdjacentNode(matrix[rowIdx + 1][colIdx]);
    }

    if (colIdx < matrix[0].length - 1) {
      node.addAdjacentNode(matrix[rowIdx][colIdx + 1]);
    }
  }

  public clone(): GraphModel {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }
}
