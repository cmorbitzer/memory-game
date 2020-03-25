import { configureStore } from '@reduxjs/toolkit';
import game from './game';

const reducer = { game };
const store = configureStore({ reducer });

export default store;

export type FirestoreUpdateActionPayload<T> = Partial<{ [k in keyof T]: T[k] | firebase.firestore.FieldValue }>;
export type RootState = ReturnType<typeof store.getState>;
