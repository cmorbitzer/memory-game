import React from 'react';
import classnames from 'classnames';
import './Card.css';

interface CardProps {
  value: string;
  selected: boolean;
  matched: boolean;
  onClick: () => void;
}

const Card: React.FC<CardProps> = props => {
  const classNames = classnames('Card', props.selected ? 'Card__front' : 'Card__back', { 'Card__hidden': props.matched });

  return (
    <div onClick={props.onClick} className={classNames}>
      {props.selected && props.value}
    </div>
  );
};

export default Card;
