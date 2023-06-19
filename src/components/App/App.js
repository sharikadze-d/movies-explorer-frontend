import { Route, Routes } from 'react-router-dom';
import './App.css';

import Main from '../Main/Main.js';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={
          <>
            <Main />
          </>
        }/>
      </Routes>
    </div>
  );
}

export default App;
