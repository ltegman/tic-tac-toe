import React, { Component } from 'react';

class Game extends Component {
  onSquareClick = () => {
    this.props.onClick(this.props.x, this.props.y);
  };
  render() {
    return (
      <div className="square" onClick={this.onSquareClick}>
        {this.props.val}
      </div>
    );
  }
}

export default Game;
