import React from 'react';
import './Card.css';

interface CardProps {
  value: string;
  selected: boolean;
  onClick: () => void;
}

const Card: React.FC<CardProps> = props => (
  <div onClick={props.onClick}>
    {props.selected ?
      <div className="Card Card__front">{props.value}</div> :
      <div className="Card Card__back"></div>}
  </div>
);

export default Card;
