import './App.css';
import { createStore } from 'redux';
import appReducer from './reducers/appReducer';
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import GameLogic from './components/GameLogic';


const store = createStore(appReducer, {}, composeWithDevTools());

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <GameLogic />
      </div>
    </Provider>
  );
}

export default App;
