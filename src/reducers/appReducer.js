import { combineReducers } from 'redux';
import gameReducer from './gameReducer';
import settingsReducer from './settingsReducer';


const appReducer = combineReducers({
    game: gameReducer,
    settings: settingsReducer
})

export default appReducer
