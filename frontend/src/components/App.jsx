import { useState, useEffect } from 'react'
import styles from '../styles/selectionBox.module.css'
import getMap from '../api/getMap';
import postCharacterCoordinates from '../api/postCharacterCoordinates';
import getCharacters from '../api/getCharacters';
import getHighScores from '../api/getHighScores';
import postCharacterToFound from '../api/postCharacterToFound';
import getFoundCharacterCount from '../api/getFoundCharacterCount';
import updateGameForWin from '../api/updateGameForWin';
import createGame from '../utils/createGame';

function App() {
  const [map, setMap] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [highScores, setHighScores] = useState([]);
  const [game, setGame] = useState(null);
  const [points, setPoints] = useState(0);
  const [message, setMessage] = useState('');
  const [win, setWin] = useState(null);

  const [selectionVisible, setSelectionVisible] = useState(false);
  const [selectionCoords, setSelectionCoords] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [hitboxPad, setHitboxPad] = useState(0);

  const [error, setError] = useState(null);

  function handleClick(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    setDimensions({ width: rect.width, height: rect.height });
    setHitboxPad(rect.width / 18)

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setSelectionCoords({ x: x, y: y });
    setSelectionVisible(true);
  };

  async function confirmSelection(e, id, name) {
    e.stopPropagation();

    try {
      const { x, y } = selectionCoords;
      const selectionData = {
        selectionCoords: selectionCoords,
        hitbox: hitboxPad,
        dimensions: dimensions,
      };

      const confirmedSelection = await postCharacterCoordinates(id, selectionData);

      if (confirmedSelection) {
        const confirmedNotFound = await postCharacterToFound(game.id, id);
        if (confirmedNotFound) {
          const tally = await getFoundCharacterCount(game.id);
          setMessage(`found ${name}`)
          setPoints(tally);
          setSelectionVisible(false);
          return;
        } else {
          setMessage(`Already found ${name}`);
          setSelectionVisible(false);
          return;
        }
      } else {
        setMessage(`did not find ${name}`)
        setSelectionVisible(false);
        return;
      }
    } catch (err) {
      setError(err);
    };
  };

  async function submitGameDetails(e) {
    e.preventDefault();

    try {
      const success = await updateGameForWin(game);

      if (!success) {
        return null;
      };

      const highScores = await getHighScores();

      setGame(null);
      setWin(false);
      setHighScores(highScores);
    } catch (err) {
      setError(err);
    };
  };

  useEffect(() => {
    async function initializePage() {
      try {
        const currentMap = await getMap(2);
        const characterData = await getCharacters(2);
        const highScores = await getHighScores();
        setMap(currentMap);
        setCharacters(characterData);
        setHighScores(highScores);
      } catch (err) {
        setMap(null);
        setCharacters([]);
        setHighScores([]);
        setError(err);
      };
    };

    initializePage();
  }, []);

  useEffect(() => {
    async function checkWin() {
      try {
        if (game && points === characters.length) {
          const endTime = new Date();

          const updatedGame = {
            ...game,
            endTime: endTime,
            duration: (endTime.getTime() - new Date(game.startTime).getTime()),
          };

          setGame(updatedGame)
          setWin(true);
          return;
        };

        setWin(false);
      } catch (err) {
        setError(err);
      }
    }

    checkWin();
  }, [points]);

  if (error) {
    return (
      <div>
        <h1>{error.message}</h1>
        <Link to='/'>
          <button onClick={() => setError(null)}>Back to Homepage</button>
        </Link>
      </div>
    )
  };

  if (win) {
    return (
      <form onSubmit={submitGameDetails}>
        <h1>You Won!</h1>
        <label htmlFor="userId">Input your name for scoring: </label>
        <input type="text" name="userId" id="userId" onChange={(e) => setGame({ ...game, userId: e.target.value })} required />
        <button type="submit">Submit Score</button>
      </form>
    )
  };

  if (!game) {
    return (
      <div className={styles.app}>
        <h1>Where's Waldo</h1>
        <button onClick={() => createGame(map.id, setGame)}>Start New Game</button>
        {highScores.length > 0 ? (
          <>
            <h1>High Scores</h1>
            <ol>
              {highScores.map((score, index) => (
                <li key={index}>{score.userId}: {Math.floor(score.duration / 60000)}:{String(Math.floor((score.duration % 60000) / 1000)).padStart(2, '0')}</li>
              ))}
            </ol>
          </>
        ) : (
          <h1>No High Scores Yet</h1>
        )}
      </div>
    )
  };

  return (
    <div className={styles.app}>
      <h1>Where's Waldo</h1>
      <div className={styles.topBar}>
        <p>You have found {points} characters out of {characters.length}</p>
        <p>{message}</p>
      </div>
      <div onClick={handleClick} className={styles.selectionSurface}>
        <img src={map.cloudinaryPath} alt="waldo beach" />
        {selectionVisible ? (
          <div className={`${styles.selection} ${styles.visible}`} style={{ top: selectionCoords.y - (hitboxPad / 2), left: selectionCoords.x - (hitboxPad / 2), height: hitboxPad, width: (hitboxPad * 2) }}>
            <div style={{ height: hitboxPad, width: hitboxPad }}></div>
            <div className={styles.buttons} style={{ height: hitboxPad, width: hitboxPad, fontSize: (hitboxPad / 8) }}>
              {characters.map((character) => (
                <button key={character.id} onClick={(e) => confirmSelection(e, character.id, character.name)}>{character.name}</button>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.selection}></div>
        )}
      </div>
    </div>
  )
};

export default App