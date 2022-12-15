import _ from "lodash";
import ReactJoyride from "react-joyride";
import { TOUR_STEPS, TOUR_THEME } from "../constants";
import { usePathVisualizerOptionsContext } from "../context/PathVisualizerProvider";
import Canvas from "./canvas/Canvas";
import Legends from "./legends/Legends";
import TopMenu from "./top-menu/TopMenu";
import "./PathVisualizer.scss";
import classNames from "classnames";

const PathVisualizer = () => {
  const { showTour, handleTourCallback } = usePathVisualizerOptionsContext()!;
  return (
    <div className={classNames("Path-Visualizer", { "no-scroll": showTour })}>
      <TopMenu />
      <Canvas />
      <Legends />
      <ReactJoyride
        steps={TOUR_STEPS}
        locale={{ last: "Finish" }}
        run={showTour}
        callback={handleTourCallback}
        continuous
        showProgress
        showSkipButton
        scrollToFirstStep
        spotlightClicks
        hideCloseButton
        styles={TOUR_THEME}
      />
    </div>
  );
};

export default PathVisualizer;
