import { combineReducers } from 'redux';
import DecksReducer from './decks';
import { reducer as formReducer } from 'redux-form';

const reducers = combineReducers({
  decks: DecksReducer,
  form: formReducer
});

export default reducers;
