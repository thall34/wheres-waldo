async function postCharacterToFound(gameId, characterId) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/game/${gameId}/character/${characterId}`, {
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