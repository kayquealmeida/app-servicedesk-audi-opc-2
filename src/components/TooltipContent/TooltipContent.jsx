import React from "react";
import { Tooltip } from "react-tooltip";
import "./TooltipContent.css";

const TooltipContent = ({ id, text, children }) => {
  return (
    <div className="tooltipcontainer">
      <Tooltip id={id} />
      <span
        className="tooltiphelp"
        data-tooltip-id={id}
        data-tooltip-html={text}
        data-tooltip-place="top"
        data-tooltip-delay-hide={1500}
        style={{ display: "inline-block", cursor: "pointer" }}
      >
        {children}
      </span>
    </div >
  );
};

export default TooltipContent;
