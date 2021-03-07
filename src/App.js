import './App.css';
import Header from './components/header';
import List from './components/List';
import Store from './redux/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <div className="App">
      <Provider store={Store}>
        <Header />
        <List />
      </Provider>
    </div>
  );
}

export default App;
