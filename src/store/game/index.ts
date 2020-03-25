import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import firebase from 'firebase';
import { db } from '../../firebase';
import { Game } from '../../models/Game';
import { FirestoreUpdateActionPayload } from '../index';

const game = createSlice({
  name: 'game',
  initialState: null as Game | null,
  reducers: {
    setGame: (_, action: PayloadAction<Game | null>) => action.payload,
    updateGameState: (state, action: PayloadAction<FirestoreUpdateActionPayload<Game['state']>>) => {
      if (state) {
        const data = Object.fromEntries(Object.entries(action.payload).map(([k, v]) => {
          if (v && 'sentinel' in v) {
            v = firebase.firestore.FieldValue[v.sentinel](
              // @ts-ignore
              ...v.args);
          }
          return ['state.' + k, v];
        }));
        db.collection('games').doc(state.id).update(data);
      }
      return state;
    },
  },
});

export const { setGame, updateGameState } = game.actions;
export default game.reducer;
