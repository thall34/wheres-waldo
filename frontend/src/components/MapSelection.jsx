import { useState, useEffect } from 'react';
import getMaps from '../api/getMaps';
import createNewGame from '../api/createNewGame';
import scoreDisplay from '../utils/scoreDisplay';

function MapSelection({ setGame, setMap, setCharacters }) {
    const [maps, setMaps] = useState([]);

    async function createGame(map) {
        try {
            const success = await createNewGame(map.id);
    
            if (!success) {
                setGame(null);
            };
    
            setGame(success.data);
            setMap(map);
            setCharacters(map.characters);
        } catch (err) {
            setGame(null);
        };
    };

    useEffect(() => {
        async function initializeComponent() {
            try {
                const allMaps = await getMaps();
                setMaps(allMaps.data);
            } catch (err) {
                setMaps([]);
            };
        };

        initializeComponent();
    }, []);

    return (
        <div className='app'>
            <h1>Where's Waldo</h1>
            <div className='main-menu'>
            {maps.map((map) => (
                <div key={map.id}>
                    <img src={map.cloudinaryPath} className='map-select' />
                    <button onClick={() => createGame(map)}>Start New Game</button>
                    {map.games.length > 0 ? (
                        <>
                            <ol>
                                {map.games.map((score, index) => (
                                    <li key={index}>{scoreDisplay(score)}</li>
                                ))}
                            </ol>
                        </>
                    ) : (
                        <h1>No High Scores Yet</h1>
                    )}
                    
                </div>
            ))}
            </div>
        </div>
    )
}

export default MapSelection;