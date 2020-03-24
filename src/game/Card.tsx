import React from 'react';
import classnames from 'classnames';
import './Card.css';

interface CardProps {
  value: string;
  selected: boolean;
  onClick: () => void;
}

const Card: React.FC<CardProps> = props => {
  const classNames = classnames('Card', { Card__selected: props.selected });

  return (
    <div className={classNames} onClick={props.onClick}>
      {props.value}
    </div>
  );
}

export default Card;
