import { useState, useEffect } from 'react'
import styles from '../styles/selectionBox.module.css'
import getMapUrl from '../api/getMapUrl';
import postCharacterCoordinates from '../api/postCharacterCoordinates';
import getCharacters from '../api/getCharacters';

function App() {
  const [game, setGame] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [highScores, setHighScores] = useState([]);

  const [selectionVisible, setSelectionVisible] = useState(false);
  const [selectionCoords, setSelectionCoords] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [hitboxPad, setHitboxPad] = useState(0);
  
  const [points, setPoints] = useState(0);
  // const [message, setMessage] = useState('');

  function handleClick(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    setDimensions({ width: rect.width, height: rect.height });
    setHitboxPad(rect.width / 18)

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setSelectionCoords({ x: x, y: y });
    setSelectionVisible(true);
  };

  async function confirmSelection(e, id) {
    e.stopPropagation();

    try {

    const { x, y } = selectionCoords;
    const selectionData = {
      selectionCoords: selectionCoords,
      hitbox: hitboxPad,
      dimensions: dimensions,
    };

    const confirmedSelection = await postCharacterCoordinates(id, selectionData);
    // if (found) {
    //   setSelectionVisible(false);
    //   setMessage(`already found ${name}`)
    //   return;
    // }

    // change this to be if the return from the api is true
    if (confirmSelection) {
      setMessage(`found ${name}`)
      // and make this a call to the api to add the characterId and gameId to the found characters join table
      // setCharacters(prev =>
      //   prev.map(character =>
      //     character.id === id ? { ...character, found: true } : character
      //   )
      // );
      setPoints(points => points + 1);
      setSelectionVisible(false);
      return;
    } else {
      setMessage(`did not find ${name}`)
      setSelectionVisible(false);
      return;
    }
  } catch(err) {
    return err
  };
  }

  useEffect(() => {
    async function initializePage() {
      try {
        const currentMapUrl = await getMapUrl(2);
        const characterData = await getCharacters(2);
        setImageUrl(currentMapUrl);
        setCharacters(characterData);
      } catch (err) {
        setImageUrl(null);
        setCharacters([]);
      }
    };

    initializePage();
  }, []);

  // useEffect(() => {
  //   const allActive = characters.every(character => character.found === true);
  //   if (allActive) {
  //     alert('All characters found');
  //   };
  // }, [characters])

  // if (!game) {
  //   return (
  //     <div className={styles.app}>
  //       <h1>Where's Waldo</h1>
  //       <button>Start New Game</button>
  //       <ol>
  //         {highScores.map((score, index) => (
  //           <li key={index}>{score.userId}: {score.duration}</li>
  //         ))}
  //       </ol>
  //     </div>
  //   )
  // }

  return (
    <div className={styles.app}>
      <h1>Where's Waldo</h1>
      <div className={styles.topBar}>
        <p>You have found {points} characters out of {characters.length}</p>
        <p>{}</p>
      </div>
      <div onClick={handleClick} className={styles.selectionSurface}>
        <img src={imageUrl} alt="waldo beach" />
        {selectionVisible ? (
          <div className={`${styles.selection} ${styles.visible}`} style={{ top: selectionCoords.y - (hitboxPad / 2), left: selectionCoords.x - (hitboxPad / 2), height: hitboxPad, width: (hitboxPad * 2) }}>
            <div style={{ height: hitboxPad, width: hitboxPad }}></div>
            <div className={styles.buttons} style={{ height: hitboxPad, width: hitboxPad, fontSize: (hitboxPad / 8) }}>
              {characters.map((character) => (
                <button key={character.id} onClick={(e) => confirmSelection(e, character.id)}>{character.name}</button>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.selection}></div>
        )}
      </div>
    </div>
  )
}

export default App