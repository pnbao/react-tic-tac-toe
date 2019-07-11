import React from "react";
import "../svg.css";
import "../index.css";

const Xsvg = () => {
  return (
    <div className="xsvg">
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="50px"
        height="50px"
        viewBox="0 0 48 48"
      >
        <g id="Layer_3">
          <line
            id="path2"
            stroke="#000000"
            strokeWidth="3"
            strokeMiterlimit="10"
            x1="8.5"
            y1="41.5"
            x2="41.5"
            y2="8.5"
          />
          <line
            id="path3"
            stroke="#000000"
            strokeWidth="3"
            strokeMiterlimit="10"
            x1="41.5"
            y1="41.5"
            x2="8.5"
            y2="8.5"
          />
        </g>
      </svg>
    </div>
  );
};

const Osvg = () => {
  return (
    <div className="osvg">
      <svg
        version="1.1"
        id="Layer_2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
      >
        <circle
          className="path"
          stroke="black"
          strokeWidth="3"
          fill="none"
          cx="24"
          cy="24"
          r="7"
        />
      </svg>
    </div>
  );
};

export default class Square extends React.Component {
  render() {
    let pick;
    if (this.props.value === "X") {
      pick = <Xsvg />;
    } else if (this.props.value === "O") {
      pick = <Osvg />;
    }
    return (
      <button
        className={"square " + (this.props.isWinning ? "won" : null)}
        onClick={() => this.props.onClick()}
      >
        {pick}
      </button>
    );
  }
}
