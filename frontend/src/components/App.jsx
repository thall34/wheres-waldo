import { useState, useEffect } from 'react'
import waldo from '../assets/waldo.jpeg'
import db from '../assets/testDb';
import styles from '../styles/selectionBox.module.css'

function App() {
  const [selectionVisible, setSelectionVisible] = useState(false);
  const [selectionCoords, setSelectionCoords] = useState({ x: 0, y: 0 });
  const [characters, setCharacters] = useState(db);
  const [points, setPoints] = useState(0);

  const hitboxPad = 50;

  function handleClick(e) {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    setSelectionCoords({ x: x, y: y });
    setSelectionVisible(true);
  };

  function confirmSelection(e, character) {
    e.stopPropagation();

    const { x, y } = selectionCoords;
    const { name, xLeft, xRight, yTop, yBottom, found } = character;

    if (found) {
      setSelectionVisible(false);
      console.log(`already found ${name}`)
      return;
    }

    if (x <= xRight + hitboxPad && x >= xLeft - hitboxPad && y >= yTop - hitboxPad && y <= yBottom + hitboxPad) {
      console.log(`found ${name}`);
      setCharacters(prev => ({
        ...prev,
        [name]: {
          ...prev[name],
          found: true
        }
      }));
      setPoints(points => points + 1);
      setSelectionVisible(false);
      return;
    } else {
      console.log(`did not find ${name}`)
      setSelectionVisible(false);
      return;
    }
  }

  useEffect(() => {
    if (points === 3) {
      alert('Found all Characters!')
    };
  }, [points])

  return (
    <div onClick={handleClick} className={styles.selectionSurface}>
      <img src={waldo} alt="waldo beach" />
      {selectionVisible ? (
        <div className={`${styles.selection} ${styles.visible}`} style={{ top: selectionCoords.y - hitboxPad, left: selectionCoords.x - hitboxPad }}>
          <div className={styles.selectBox}></div>
          <div className={styles.buttons}>
            <button onClick={(e) => confirmSelection(e, characters.waldo)}>Waldo</button>
            <button onClick={(e) => confirmSelection(e, characters.wilma)}>Wilma</button>
            <button onClick={(e) => confirmSelection(e, characters.wizard)}>Wizard</button>
          </div>
        </div>
      ) : (
        <div className={styles.selection}></div>
      )}
    </div>
  )
}

export default App