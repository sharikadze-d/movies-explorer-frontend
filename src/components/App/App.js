import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import './App.css';

import Main from '../Main/Main.js';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

function App() {
  const [isBurgerOpened, setIsBurgerOpened] = useState(false);

  function handleBurgerClick() {
    setIsBurgerOpened(true);
  }

  function closeBurgerMenu() {
    setIsBurgerOpened(false);
  }

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={
          <>
            <Header isLoggedIn={false}/>
            <Main />
            <Footer />
          </>
        }/>
        <Route path="/movies" element={
          <>
            <Header
              isLoggedIn={true}
              onBurgerClick={handleBurgerClick}
            />
            <Movies />
            <BurgerMenu
              isOpened={isBurgerOpened}
              onCloseClick={closeBurgerMenu}
            />
            <Footer />
          </>
        }/>
      </Routes>
    </div>
  );
}

export default App;
