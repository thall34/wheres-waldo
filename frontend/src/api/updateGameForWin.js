async function updateGameForWin(gameData) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/game/final/${gameData.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(gameData),
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

export default updateGameForWin;