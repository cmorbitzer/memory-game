import { Model } from '.';

export type GameType = 'memory';

export interface AbstractGame extends Model {
  type: GameType;
  webId: string;
  props: {};
  state: {};
}

export interface MemoryGameProps {
  cards: string[];
  order: number[];
}

export interface MemoryGameState {
  selectedCards: number[];
  matchedCards: number[];
}

export interface MemoryGame extends AbstractGame {
  type: 'memory';
  props: MemoryGameProps;
  state: MemoryGameState;
}

export type Game = MemoryGame;
