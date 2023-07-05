import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import './App.css';

import Main from '../Main/Main.js';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';

function App() {
  const [isBurgerOpened, setIsBurgerOpened] = useState(false);

  // ***************************************
  const user = {
    name: 'Виталий',
    email: 'pochta@yandex.ru'
  }

  // ***************************************
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
        <Route path="/saved-movies" element={
          <>
            <Header
              isLoggedIn={true}
              onBurgerClick={handleBurgerClick}
            />
            <BurgerMenu
              isOpened={isBurgerOpened}
              onCloseClick={closeBurgerMenu}
            />
            <SavedMovies />
            <Footer />
          </>
        }/>
        <Route path="/profile" element={
          <>
            <Header
              isLoggedIn={true}
              onBurgerClick={handleBurgerClick}
            />
            <BurgerMenu
              isOpened={isBurgerOpened}
              onCloseClick={closeBurgerMenu}
            />
            <Profile userData={user} />
          </>
        }/>
      </Routes>
    </div>
  );
}

export default App;
