import { useState, useEffect } from 'react'
import waldo from '../assets/waldo.jpeg'
import db from '../assets/testDb';
import styles from '../styles/selectionBox.module.css'

function App() {
  const [selectionVisible, setSelectionVisible] = useState(false);
  const [selectionCoords, setSelectionCoords] = useState({ x: 0, y: 0 });
  const [characters, setCharacters] = useState(db);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [points, setPoints] = useState(0);
  const [message, setMessage] = useState('');
  const [hitboxPad, setHitboxPad] = useState(0);

  function handleClick(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    setDimensions({ width: rect.width, height: rect.height });
    setHitboxPad(rect.width / 20)

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setSelectionCoords({ x: x, y: y });
    setSelectionVisible(true);
  };

  function confirmSelection(e, character) {
    e.stopPropagation();

    const { x, y } = selectionCoords;
    const { id, name, xLeft, xRight, yTop, yBottom, found } = character;
    const normalizedXLeft = parseFloat(((xLeft / 100) * dimensions.width).toFixed(2));
    const normalizedXRight = parseFloat(((xRight / 100) * dimensions.width).toFixed(2));
    const normalizedYTop = parseFloat(((yTop / 100) * dimensions.height).toFixed(2));
    const normalizedYBottom = parseFloat(((yBottom / 100) * dimensions.height).toFixed(2));

    if (found) {
      setSelectionVisible(false);
      setMessage(`already found ${name}`)
      return;
    }

    if (x <= normalizedXRight + (hitboxPad / 2) && x >= normalizedXLeft - (hitboxPad / 2) && y >= normalizedYTop - (hitboxPad / 2) && y <= normalizedYBottom + (hitboxPad / 2)) {
      setMessage(`found ${name}`)
      setCharacters(prev =>
        prev.map(character =>
          character.id === id ? { ...character, found: true } : character
        )
      );
      setPoints(points => points + 1);
      setSelectionVisible(false);
      return;
    } else {
      setMessage(`did not find ${name}`)
      setSelectionVisible(false);
      return;
    }
  }

  useEffect(() => {
    const allActive = characters.every(character => character.found === true);
    if (allActive) {
      alert('All characters found');
    };
  }, [characters])

  return (
    <div className={styles.app}>
      <h1>Where's Waldo</h1>
      <div className={styles.topBar}>
        <p>You have found {points} characters out of {characters.length}</p>
        <p>{message}</p>
      </div>
      <div onClick={handleClick} className={styles.selectionSurface}>
        <img src={waldo} alt="waldo beach" />
        {selectionVisible ? (
          <div className={`${styles.selection} ${styles.visible}`} style={{ top: selectionCoords.y - (hitboxPad / 2), left: selectionCoords.x - (hitboxPad / 2), height: hitboxPad, width: (hitboxPad * 2) }}>
            <div style={{ height: hitboxPad, width: hitboxPad }}></div>
            <div className={styles.buttons} style={{ height: hitboxPad, width: hitboxPad, fontSize: (hitboxPad / 8) }}>
              {characters.map((character) => (
                <button key={character.id} onClick={(e) => confirmSelection(e, character)}>{character.name}</button>
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