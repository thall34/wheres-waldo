async function postCharacterCoordinates(id, characterData) {
    try {
        const response = await fetch(`http://localhost:3000/api/character/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(characterData),
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

export default postCharacterCoordinates;