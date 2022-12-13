import React from "react";
import "./Beacon.scss";

interface IBeacon {
  color: string;
}
const Beacon: React.FC<IBeacon> = ({ color }) => {
  return (
    <div className="Beacon">
      <div
        className="beacon"
        style={{ boxShadow: `0px 0px 2px 2px ${color}` }}
      ></div>
      <div className="dot" style={{ backgroundColor: color }}></div>
    </div>
  );
};

export default Beacon;
