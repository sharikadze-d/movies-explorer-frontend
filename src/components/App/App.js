import { Route, Routes } from 'react-router-dom';
import './App.css';

import Main from '../Main/Main.js';
import Header from '../Header/Header';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <Main />
          </>
        }/>
      </Routes>
    </div>
  );
}

export default App;
