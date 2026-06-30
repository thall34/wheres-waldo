import createNewGame from "../api/createNewGame";

async function createGame(id, setGameState) {
    try {
        const success = await createNewGame(id);

        if (!success) {
            setGameState(null);
        };

        setGameState(success);
    } catch (err) {
        setGameState(null);
    }
};

export default createGame;