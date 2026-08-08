async function postCharacterCoordinates(id, characterData) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/character/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(characterData),
        });

        if (!response.ok) {
            throw new Error('Character not found at coordinates')
        };

        const success = await response.json();
        return success;
    } catch (err) {
        throw err;
    }
}

export default postCharacterCoordinates;