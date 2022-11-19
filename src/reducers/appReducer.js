import { combineReducers } from 'redux';
import gameReducer from './gameReducer';

const appReducer = combineReducers({
  'game': gameReducer
})

export default appReducer
