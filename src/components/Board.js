import React from "react";
import Square from "./Square";
import "../index.css";

export default class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={"sq" + i}
        isWinning={this.props.winningSquares.includes(i)}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  renderSquares(n) {
    let squares = [];
    for (let i = n; i < n + 3; i++) {
      squares.push(this.renderSquare(i));
    }
    return squares;
  }

  renderRows(i) {
    return <div className="board-row">{this.renderSquares(i)}</div>;
  }

  render() {
    return (
      <div>
        {this.renderRows(0)}
        {this.renderRows(3)}
        {this.renderRows(6)}
      </div>
    );
  }
}
