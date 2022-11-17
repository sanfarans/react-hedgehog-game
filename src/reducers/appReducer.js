import { combineReducers } from 'redux';
import boardReducer from './boardReducer';

const appReducer = combineReducers({
  'board': boardReducer
})

export default appReducer
