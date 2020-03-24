import React, { useState } from 'react';
import { range, shuffle } from 'lodash';
import './Game.css';
import Card from './Card';

const cards = [...Array(24)].map((_, i) => Math.floor(i / 2).toString());
const order = shuffle(range(24));

const Game: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);

  function selectCard(card: number) {
    if (selectedCard === null) {
      return setSelectedCard(card);
    }

    if (card !== selectedCard && cards[card] === cards[selectedCard]) {
      setMatchedCards(matchedCards.concat(card, selectedCard));
    }

    setSelectedCard(null);
  }

  return (
    <div className="Game">
      {cards.map((v, i) => {
        const cardStyle: React.CSSProperties = {
          order: order[i],
          visibility: matchedCards.indexOf(i) > -1 ? 'hidden' : 'initial',
        };

        return (
          <div key={i.toString()} style={cardStyle}>
            <Card value={v} selected={selectedCard === i} onClick={() => selectCard(i)}></Card>
          </div>
        );
      })}
    </div>
  );
}

export default Game;
