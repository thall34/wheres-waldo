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
        <main>
            <div className='map-select'>
                {maps.map((map) => (
                    <div key={map.id} className='map-card'>
                        <img src={map.cloudinaryPath} className='map-image' />
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
                            <p>No High Scores Yet</p>
                        )}

                    </div>
                ))}
            </div>
        </main>
    )
}

export default MapSelection;