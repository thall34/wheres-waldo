async function postCharacterToFound(gameId, characterId) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/game/${gameId}/character/${characterId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Character already found')
        };

        const success = await response.json();
        return success;
    } catch (err) {
        throw err;
    }
}

export default postCharacterToFound;