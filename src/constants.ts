import { dijkstra } from "./algorithms/dijkstra";
import { TAlgorithm } from "./models";

export const CONSTANTS = {
  rows: 20,
  cols: 45,
  totalNodes: 20 * 45,
};

export const ALGORITHMS: TAlgorithm[] = [
  {
    name: "Dijkstra's Algorithm",
    fn: dijkstra,
  },
];

export const COLORS = {
  bgDark: "#282a36",
  bgLight: "#383a59",
  textColor: "#ffb86c",
  white: "#AFB0B1",
  darkWhite: "#f0f2f5",
  hoverColor: "#262738",
  holdDownColor: "#636587",
};
