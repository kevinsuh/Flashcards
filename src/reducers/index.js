import { combineReducers } from 'redux';
import DecksReducer from './decks';
import StudyReducer from './study';
import { reducer as formReducer } from 'redux-form';

const reducers = combineReducers({
  decks: DecksReducer,
  study: StudyReducer,
  form: formReducer
});

export default reducers;
