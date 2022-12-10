import { NodeModel } from ".";
import _, { forEach } from "lodash";
import { immerable, produce } from "immer";

export class GraphModel {
  [immerable] = true;

  graphMatrix: NodeModel[][];

  public constructor(row: number, col: number) {
    this.graphMatrix = this.buildGraph(row, col);
  }

  private getNodePosition(id: number): number[] | null {
    for (let i = 0; i < this.graphMatrix.length; i++) {
      for (let j = 0; j < this.graphMatrix[0].length; j++) {
        if (this.graphMatrix[i][j].id == id) {
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

    const node = this.graphMatrix[rowIdx][colIdx];

    return produce(this, (draft) => {
      node.changeDistance(distance);
      draft.graphMatrix[rowIdx][colIdx] = node;
    });
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
}
