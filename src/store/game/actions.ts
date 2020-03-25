import { ThunkAction } from 'redux-thunk';
import { range, shuffle } from 'lodash';
import { db } from '../../firebase';
import { New } from '../../models';
import { Game, GameType, MemoryGameProps, MemoryGameState } from '../../models/Game';
import { setGame } from '.';

// TOOD: UNSUBSCRIBE WATCHER WHEN REF CHANGES
// TODO: Factor these into regular actions

type Thunk = ThunkAction<void, any, any, any>;
type Ref<T> = firebase.firestore.DocumentReference<T>;

export function createGame(type: GameType, props?: Game['props']): Thunk {
  return async dispatch => {
    if (props === undefined) {
      props = createGameProps();
    }
    const state = createGameState();
    const webId = createGameWebId();
    const game: New<Game> = { type, webId, props, state };
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

// TODO: Guarantee uniqueness
function createGameWebId(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return [...Array(6)].map(() => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
}

export function loadGame(webId: Game['webId']): Thunk {
  return async dispatch => {
    const qs = await db.collection('games').where('webId', '==', webId).limit(1).get();
    if (!qs.empty) {
      const ref = qs.docs[0].ref as Ref<Game>;
      dispatch(watchGame(ref));
    }
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
