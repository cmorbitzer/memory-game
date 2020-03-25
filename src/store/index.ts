import { configureStore } from '@reduxjs/toolkit';
import game from './game';
import firebase from 'firebase';

const reducer = { game };
const store = configureStore({ reducer });

export default store;

type FirestoreUpdateSentinelProxy = { sentinel: keyof Omit<typeof firebase.firestore.FieldValue, 'prototype'>, args: any[] };
export type FirestoreUpdateActionPayload<T> = Partial<{ [k in keyof T]: T[k] | FirestoreUpdateSentinelProxy }>;
export type RootState = ReturnType<typeof store.getState>;
