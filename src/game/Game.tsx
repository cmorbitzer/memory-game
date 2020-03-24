import React, { useEffect, useState } from 'react';
import { range, shuffle } from 'lodash';
import { db } from '../firebase';
import './Game.css';
import Card from './Card';

interface Game {
  cards: string[];
  order: number[];
  state: {
    selectedCards: number[],
    matchedCards: number[],
  };
}

type GameRef = firebase.firestore.DocumentReference<Game>;
let gameRef: GameRef;

async function createGame(cards: Game['cards']) {
  const order = shuffle(range(24));
  const state = {
    selectedCards: [],
    matchedCards: [],
  };
  gameRef = await db.collection('games').add({ cards, order, state }) as GameRef;
  return gameRef;
}

function selectCard(card: number, game: Game) {
  let { selectedCards } = game.state;

  if (selectedCards.length >= 2) {
    return;
  }

  if (card === selectedCards[0]) {
    selectedCards = [];
  } else {
    selectedCards.push(card);
  }

  gameRef.update({ 'state.selectedCards': selectedCards });

  if (selectedCards.length === 2) {
    const matched = game.cards[selectedCards[0]] === game.cards[selectedCards[1]];
    setTimeout(() => clearSelectedCards(matched, game), 2000);
  }
}

function clearSelectedCards(matched: boolean, game: Game) {
  const { matchedCards } = game.state;

  if (matched) {
    matchedCards.push(...game.state.selectedCards);
  }

  gameRef.update({ state: { matchedCards, selectedCards: [] } });
}

const GameCmp: React.FC = () => {
  const [game, setGame] = useState<Game>();

  useEffect(() => {
    const cards = [...Array(24)].map((_, i) => Math.floor(i / 2).toString());
    let unsubscribe = () => { };

    createGame(cards).then(ref => {
      unsubscribe = ref.onSnapshot(qs => setGame(qs.data()));
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="Game">
      {game && game.cards.map((v, i) => (
        <div key={i.toString()} style={{ order: game.order[i] }}>
          {game.state.matchedCards.indexOf(i) === -1 &&
            <Card value={v} selected={game.state.selectedCards.indexOf(i) > -1}
              onClick={() => selectCard(i, game)}>
            </Card>}
        </div>
      ))}
    </div>
  );
}

export default GameCmp;
