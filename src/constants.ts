import { Step, Styles } from "react-joyride";
import { dijkstra } from "./algorithms/dijkstra";
import { TAlgorithm } from "./models";

export const ALGORITHMS: TAlgorithm[] = [
  {
    name: "Dijkstra's Algorithm",
    fn: dijkstra,
  },

  {
    name: "A* Algorithm",
    fn: dijkstra,
  },
  {
    name: "Dijkstra's Algorithm",
    fn: dijkstra,
  },
];

export const TOUR_STEPS: Step[] = [
  {
    target: "#algorithms",
    title: "Select a algorithm",
    content: "Select a path finding algorithm for visualizing the algorithm.",
    disableBeacon: true,
    placement: "auto",
  },

  {
    target: "#help",
    title: "Start tour",
    content: "Click to trigger the tour again",
    placement: "auto",
  },
  {
    target: "#profile",
    title: "Portfolio",
    content: "Click to go to my portfolio website",
    placement: "auto",
  },

  {
    target: "#theme",
    title: "Switch theme",
    content: "Click to switch the theme",
    placement: "auto",
  },

  {
    target: "#canvas",
    title: "Canvas",
    content: "Canvas for visualization",
    placement: "auto",
  },

  {
    target: "#startNode",
    title: "Start node",
    content: "This is the starting node for the algorithm",
    placement: "auto",
  },

  {
    target: "#endNode",
    title: "End node",
    content: "This is the ending node for the algorithm",
    placement: "auto",
  },

  {
    target: "#canvas",
    title: "Wall",
    content: "click and drag to drag walls",
    placement: "auto",
  },

  {
    target: "#canvas",
    title: "Weighted node",
    content: "click + shift and drag to drag weighted nodes",
    placement: "auto",
  },
  {
    title: "Reset Canvas",
    target: "#reset",
    content: "Click this to reset the canvas",
    placement: "auto",
  },
  {
    title: "Start Visualization",
    target: "#play",
    content: "Click to start the visualization process",
    placement: "auto",
  },
];

export const TOUR_THEME: Styles = {
  options: {
    arrowColor: "var(--secondary-color)",
    backgroundColor: "var(--secondary-color)",
    beaconSize: 36,
    overlayColor: "var(--overlay-color)",
    primaryColor: "var(--accent-color)",
    spotlightShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
    textColor: "var(--text-color)",

    width: undefined,
    zIndex: 100,
  },
  buttonNext: {
    color: "var(--primary-color)",
  },
};
