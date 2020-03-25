import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from './store';
import { createGame, loadGame } from './store/game/actions';
import Game from './game/Game';
import './App.css';

const mapState = ({ game }: RootState) => ({ game });
const mapDispatch = { createGame, loadGame };
const connector = connect(mapState, mapDispatch);

// TODO: Factor out login input
// TODO: Add turn taking
// TODO: Add score
// TODO: Add completion (win/lose)
// TODO: Add error handling
// TODO: Add custom game setup
// TODO: Add user accounts
const App: React.FC<ConnectedProps<typeof connector>> = ({ game, createGame, loadGame }) => {
  return (
    <div className="App">
      {game ?
        <Game game={game}></Game> :
        <div className="App__login">
          <div className="App__login_input">
            <h2>Enter your game code:</h2>
            <input type="text"
              maxLength={6}
              autoFocus
              autoComplete="off"
              onChange={e => {
                // TODO: Factor out. Use state?
                // TODO: Add loading spinner with error handling
                if (e.target.value.length === 6) {
                  loadGame(e.target.value.toUpperCase());
                }
              }}>
            </input>
          </div>

          <div>
            <a onClick={() => createGame('memory')}><small>Start a new game</small></a>
          </div>
        </div>
      }
    </div>
  );
}

export default connector(App);
