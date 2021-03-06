import React from 'react';
import { Action, ActionCreator } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { Game } from '../models/Game';
import { FirestoreUpdateActionPayload } from '../store';
import { updateGameState } from '../store/game/actions';
import './Game.css';
import Card from './Card';

function selectCard(card: number, game: Game, updateGameState: ActionCreator<Action>) {
  let { selectedCards } = game.state;

  if (selectedCards.length >= 2) {
    return;
  }

  if (card === selectedCards[0]) {
    selectedCards = [];
  } else {
    selectedCards = selectedCards.concat(card);
  }

  updateGameState({ selectedCards });

  if (selectedCards.length === 2) {
    const matched = game.props.cards[selectedCards[0]] === game.props.cards[selectedCards[1]];
    setTimeout(() => clearSelectedCards(matched, selectedCards, updateGameState), 2000);
  }
}

function clearSelectedCards(matched: boolean, selectedCards: number[], updateGameState: ActionCreator<Action>) {
  const data: FirestoreUpdateActionPayload<Game['state']> = { selectedCards: [] };

  if (matched) {
    data.matchedCards = { sentinel: 'arrayUnion', args: selectedCards };
  }

  updateGameState(data);
}

const mapDispatch = { updateGameState };
const connector = connect(null, mapDispatch);

interface Props extends ConnectedProps<typeof connector> {
  game: Game;
}

const GameCmp: React.FC<Props> = ({ game, updateGameState }) => (
  <div className="Game">
    <div className="Game__info">
      <h2>Game ID: {game.webId}</h2>
    </div>

    <div className="Game__table">
      {game && game.props.cards.map((v: any, i: any) => (
        <div key={i.toString()} style={{ order: game.props.order[i] }}>
          <Card value={v}
            selected={game.state.selectedCards.indexOf(i) > -1}
            matched={game.state.matchedCards.indexOf(i) > -1}
            onClick={() => selectCard(i, game, updateGameState)}>
          </Card>
        </div>
      ))}
    </div>
  </div>
);

export default connector(GameCmp);
