import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import HomePage from './pages/homePage';
// import './app.css';
import store from './redux/store';

function App() {
  return (
    <>
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
          <HomePage />
        </DndProvider>
      </Provider>
    </>
  );
}

export default App;
