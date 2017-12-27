import React, { Component } from 'react';
import Square from './Square.js';

function checkWinState(x, y, board, player) {
  // Check horizontal
  if (board[y].every(val => val === player)) return true;

  // Check vertical
  if (board.every(row => row[x] === player)) return true;

  // Check diagonal if coords are on a diagonal
  // All even coordinate sums are on a diagonal
  if ((x + y) % 2 === 0) {
    // check 0, 0 originating diagonal
    if (x === y && board.every((row, idx) => row[idx + 0] === player)) {
      return true;
    }
    // check 0, 2 origination diagonal
    if (x + y === 2 && board.every((row, idx) => row[2 - idx] === player)) {
      return true;
    }
  }
  // No win conditions matched
  return false;
}

function checkCatsGame(board) {
  return board.every(row => row.every(val => val));
}

// This is a function rather than a variable, because we only shallow copy the board
// during gameplay. If this were a variable when we restarted the game we wouldn't
// get a fresh board.
function createInitialState() {
  return {
    board: [[null, null, null], [null, null, null], [null, null, null]],
    isXsTurn: true,
    gameOver: false,
    tie: false
  };
}

class Game extends Component {
  state = createInitialState();

  resetGame = () => {
    this.setState(createInitialState());
  };

  handleSquareClicked = (x, y) => {
    const currVal = this.state.board[y][x];
    // If square is claimed or game is over do nothing
    if (currVal || this.state.gameOver) return;

    // We don't want to simply mutate the existing array, so we make a shallow copy
    const boardShallowCopy = [...this.state.board];
    const squareVal = this.state.isXsTurn ? 'X' : 'O';
    boardShallowCopy[y][x] = squareVal;

    const winner = checkWinState(x, y, boardShallowCopy, squareVal);
    const catsGame = checkCatsGame(boardShallowCopy);

    this.setState({
      board: boardShallowCopy,
      isXsTurn: winner ? this.state.isXsTurn : !this.state.isXsTurn,
      gameOver: winner || catsGame,
      tie: catsGame
    });
  };

  render() {
    const squares = this.state.board.map((row, y) => (
      <div className="row" key={`row${y}`}>
        {row.map((squareVal, x) => (
          <Square
            x={x}
            y={y}
            val={squareVal}
            key={`${x}-${y}`}
            onClick={this.handleSquareClicked}
          />
        ))}
      </div>
    ));
    return (
      <div className="game">
        <div className="board">{squares}</div>
        <div className="controls">
          <button onClick={this.resetGame}>Reset</button>
        </div>
        {this.state.gameOver ? (
          <div className="dialog">
            {this.state.tie
              ? 'Cats Game!'
              : `${this.state.isXsTurn ? 'X' : 'O'} wins!`}
          </div>
        ) : null}
      </div>
    );
  }
}

export default Game;
