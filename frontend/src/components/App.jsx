import { useState, useEffect } from 'react'
import '../styles/App.css'
import MapSelection from './MapSelection';
import Gameboard from './Gameboard';
import WinScreen from './WinScreen';
import Header from './Header';
import Footer from './Footer';

function App() {
  const [characters, setCharacters] = useState([]);
  const [map, setMap] = useState(null);
  const [game, setGame] = useState(null);
  const [win, setWin] = useState(null);

  const [error, setError] = useState(null);

  if (error) {
    return (
      <div className='app'>
        <h1>{error.message}</h1>
        <button onClick={() => setError(null)}>Return to Main Menu</button>
      </div>
    )
  };

  if (win) {
    return (
      <div className='app'>
        <Header />
        <WinScreen game={game} setGame={setGame} setWin={setWin} />
        <Footer />
      </div>
    )
  };

  if (!game) {
      return (
        <div className='app'>
          <Header />
          <MapSelection setGame={setGame} setMap={setMap} setCharacters={setCharacters} />
          <Footer />
        </div>
      )
  };

  return (
    <div className='app'>
      <Header />
      <Gameboard game={game} map={map} characters={characters} setWin={setWin} setGame={setGame} />
      <Footer />
    </div>
  )
};

export default App