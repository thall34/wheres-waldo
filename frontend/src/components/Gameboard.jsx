import { useState, useEffect } from 'react';
import postCharacterCoordinates from '../api/postCharacterCoordinates';
import postCharacterToFound from '../api/postCharacterToFound';
import winningGameTimes from '../utils/winningGameTimes';
import Topbar from './Topbar';

function Gameboard({ game, map, characters, setWin, setGame }) {
    const [points, setPoints] = useState(0);
    const [message, setMessage] = useState('');
    const [selectionVisible, setSelectionVisible] = useState(false);
    const [selection, setSelection] = useState({ x: 0, y: 0, width: 0, height: 0, hitboxPad: 0 })

    function handleClick(e) {
        const rect = e.currentTarget.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const hitbox = rect.width / 18;
        const width = rect.width;
        const height = rect.height;

        setSelection({ x, y, width, height, hitbox })
        setSelectionVisible(true);
    };

    async function confirmSelection(e, id, name) {
        e.stopPropagation();

        try {
            await postCharacterCoordinates(id, selection);
            return true;

        } catch (err) {
            setMessage(`${name} not found`);
            setSelectionVisible(false);
            return;
        };
    };

    async function confirmCharacterFound(e, id, name) {
        e.stopPropagation();

        try {
            const confirmedSelection = await confirmSelection(e, id, name);
            if (confirmedSelection) {
                const confirmFound = await postCharacterToFound(game.id, id);
                setMessage(`${name} found`);
                const newPoints = points + 1;
                setPoints(newPoints);
                setSelectionVisible(false);
                if (newPoints === characters.length) {
                    setWin(true);
                    setGame(prevGame => winningGameTimes(prevGame));
                    return;
                };

                return;
            };
        } catch (err) {
            setMessage(`${name} already found`);
            setSelectionVisible(false);
            return;
        };
    };

    return (
        <div className='app'>
            <h1>Where's Waldo</h1>
            <Topbar points={points} message={message} characters={characters} />
            <div className='map-container' onClick={handleClick}>
                <img src={map.cloudinaryPath} />
                {selectionVisible && (
                    <div className='selection' style={{ top: selection.y - (selection.hitbox / 2), left: selection.x - (selection.hitbox / 2), height: selection.hitbox, width: (selection.hitbox * 2) }}>
                        <div style={{ height: selection.hitbox, width: selection.hitbox }}></div>
                        <div className='buttons' style={{ height: selection.hitbox, width: selection.hitbox, fontSize: (selection.hitbox / 8) }}>
                            {characters.map((character) => (
                                <button key={character.id} onClick={(e) => confirmCharacterFound(e, character.id, character.name)}>{character.name}</button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
};

export default Gameboard;