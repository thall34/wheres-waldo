async function getFoundCharacterCount(gameId) {
    try {
        const response = await fetch(`http://localhost:3000/api/game/${gameId}/found`);

        if (!response.ok) {
            return null;
        };

        const characters = await response.json();
        return characters;
    } catch (err) {
        return err;
    };
};

export default getFoundCharacterCount;