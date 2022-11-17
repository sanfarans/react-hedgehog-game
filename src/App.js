import './App.css';
import { createStore } from 'redux';
import appReducer from './reducers/appReducer';
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import Board from './components/Board';


const store = createStore(appReducer, {}, composeWithDevTools());

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Board />
      </div>
    </Provider>
  );
}

export default App;
