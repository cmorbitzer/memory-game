import React, { useState, SetStateAction } from 'react';
import { range, shuffle } from 'lodash';
import './Game.css';
import Card from './Card';

interface GameState {
  selectedCards: number[],
  matchedCards: number[],
}

type SetGameState = React.Dispatch<SetStateAction<GameState>>;

const cards = [...Array(24)].map((_, i) => Math.floor(i / 2).toString());
const order = shuffle(range(24));

function selectCard(card: number, state: GameState, setState: SetGameState) {
  let { selectedCards } = state;

  if (card === selectedCards[0]) {
    selectedCards = [];
  } else {
    selectedCards.push(card);
  }

  setState({ ...state, selectedCards });

  if (selectedCards.length === 2) {
    const matched = cards[selectedCards[0]] === cards[selectedCards[1]];
    setTimeout(() => clearSelectedCards(matched, state, setState), 2000);
  }
}

function clearSelectedCards(matched: boolean, state: GameState, setState: SetGameState) {
  const { matchedCards } = state;

  if (matched) {
    matchedCards.push(...state.selectedCards);
  }

  setState({ ...state, matchedCards, selectedCards: [] });
}

const Game: React.FC = () => {
  const [state, setState] = useState<GameState>({
    selectedCards: [],
    matchedCards: [],
  });

  return (
    <div className="Game">
      {cards.map((v, i) => (
        <div key={i.toString()} style={{ order: order[i] }}>
          {state.matchedCards.indexOf(i) === -1 &&
            <Card value={v} selected={state.selectedCards.indexOf(i) > -1} onClick={() => selectCard(i, state, setState)}></Card>}
        </div>
      ))}
    </div>
  );
}

export default Game;
