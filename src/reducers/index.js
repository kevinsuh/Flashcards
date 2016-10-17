import { combineReducers } from 'redux';
import DecksReducer from './decks';

const reducers = combineReducers({
  decks: DecksReducer
});

export default reducers;
