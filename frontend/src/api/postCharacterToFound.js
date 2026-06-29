async function postCharacterToFound(gameId, characterId) {
    try {
        const response = await fetch(`http://localhost:3000/api/game/${gameId}/character/${characterId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            return null;
        };

        const success = await response.json();
        return success;
    } catch (err) {
        return err;
    }
}

export default postCharacterToFound;