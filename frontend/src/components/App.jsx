import { useState, useEffect } from 'react'
import '../styles/App.css'
import MapSelection from './MapSelection';
import Gameboard from './Gameboard';
import WinScreen from './WinScreen';

function App() {
  const [characters, setCharacters] = useState([]);
  const [map, setMap] = useState(null);
  const [game, setGame] = useState(null);
  const [win, setWin] = useState(null);

  const [error, setError] = useState(null);

  if (error) {
    return (
      <div>
        <h1>{error.message}</h1>
        <button onClick={() => setError(null)}>Return to Main Menu</button>
      </div>
    )
  };

  if (win) {
    return (
      <WinScreen game={game} setGame={setGame} setWin={setWin} />
    )
  };

  if (!game) {
      return (
        <MapSelection setGame={setGame} setMap={setMap} setCharacters={setCharacters} />
      )
  };

  return (
    <Gameboard game={game} map={map} characters={characters} setWin={setWin} setGame={setGame} />
  )
};

export default App