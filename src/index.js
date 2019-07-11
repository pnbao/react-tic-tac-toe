import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Board from './components/Board';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null) }],
      playerX: true,
      stepNumber: 0,
      isDesc: true
    };
  }
  handleClick(i) {
    const locations = [
      [1, 1],
      [2, 1],
      [3, 1],
      [1, 2],
      [2, 2],
      [3, 2],
      [1, 3],
      [2, 3],
      [3, 3]
    ];

    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    if (checkWin(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.playerX ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          location: locations[i]
        }
      ]),
      playerX: !this.state.playerX,
      stepNumber: history.length
    });
  }
  sortHistory() {
    this.setState({
      isDesc: !this.state.isDesc
    });
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      playerX: step % 2 === 0
    });
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];

    const moves = history.map((step, move) => {
      const desc = move
        ? "Go to move #" + move + ": @[ " + step.location + " ]"
        : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>
            {move === this.state.stepNumber ? <b>{desc}</b> : desc}
          </button>
        </li>
      );
    });
    let status = "";
    const gameWinner = checkWin(current.squares);
    if (gameWinner) {
      status = "The winner is: " + gameWinner.player;
    } else if (endgame(current.squares)) {
      status = "Game Over!";
    } else {
      status = "Next player: " + (this.state.playerX ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            winningSquares={gameWinner ? gameWinner.line : []}
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => this.sortHistory()}>
            Sort {this.state.isDesc ? "↓" : "↑"}
          </button>
          <ol>{this.state.isDesc ? moves : moves.reverse()}</ol>
        </div>
      </div>
    );
  }
}

function checkWin(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { player: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

function endgame(squares) {
  for (let index = 0; index < squares.length; index++) {
    if (squares[index] == null) return false;
  }
  return true;
}


// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
