import { ThunkAction } from 'redux-thunk';
import { range, shuffle } from 'lodash';
import { db } from '../../firebase';
import { New } from '../../models';
import { Game, GameType, MemoryGameProps, MemoryGameState } from '../../models/Game';
import { setGame } from '.';

// TOOD: UNSUBSCRIBE WATCHER WHEN REF CHANGES

type Thunk = ThunkAction<void, any, any, any>;
type Ref<T> = firebase.firestore.DocumentReference<T>;

export function createGame(type: GameType, props?: Game['props']): Thunk {
  return async dispatch => {
    if (props === undefined) {
      props = createGameProps();
    }
    const state = createGameState();
    const game: New<Game> = { type, props, state };
    const ref = await db.collection('games').add(game) as Ref<Game>;
    dispatch(watchGame(ref));
  };
}

function createGameProps(): MemoryGameProps {
  return {
    cards: [...Array(24)].map((_, i) => Math.floor(i / 2).toString()),
    order: shuffle(range(24)),
  };
}

function createGameState(): MemoryGameState {
  return {
    selectedCards: [],
    matchedCards: [],
  };
}

export function watchGame(ref: Ref<Game>): Thunk {
  return dispatch => {
    ref.onSnapshot(qs => {
      const game = qs.data() || null;
      if (game) {
        game.id = ref.id;
      }
      dispatch(setGame(game));
    });
  };
}

export { updateGameState } from '.';
