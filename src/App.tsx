import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from './store';
import { createGame } from './store/game/actions';
import Game from './game/Game';
import './App.css';

const mapState = ({ game }: RootState) => ({ game });
const mapDispatch = { createGame };
const connector = connect(mapState, mapDispatch);

const App: React.FC<ConnectedProps<typeof connector>> = ({ game, createGame }) => (
  <div className="App">
    {game ?
      <Game game={game}></Game> :
      <div className="App__login">
        <div className="App__login_input">
          <h2>Enter your game code:</h2>
          <input type="text" maxLength={6} autoFocus autoComplete="off"></input>
        </div>
        <div>
          <a onClick={() => createGame('memory')}><small>Start a new game</small></a>
        </div>
      </div>
    }
  </div>
);

export default connector(App);
