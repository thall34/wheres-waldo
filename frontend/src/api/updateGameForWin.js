async function updateGameForWin(gameData) {
    console.log(gameData);
    try {
        const response = await fetch(`http://localhost:3000/api/game/final/${gameData.id}`, {
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