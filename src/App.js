import React, { Component } from 'react';
import Game from './components/Game.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Tic Tac Toe</h1>
        <Game />
      </div>
    );
  }
}

export default App;
