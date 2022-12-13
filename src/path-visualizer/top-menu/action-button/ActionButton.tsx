import React from "react";
import "./ActionButton.scss";
interface IActionButton {
  icon: React.ReactElement;
  label: string;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  [key: string]: any;
}
const ActionButton: React.FC<IActionButton> = ({
  icon,
  onClick,
  label,
  ...props
}) => {
  console.log(label);
  return (
    <div className="Action-Button" onClick={onClick} {...props}>
      {icon}
      <span className="label">{label}</span>
    </div>
  );
};

export default ActionButton;
