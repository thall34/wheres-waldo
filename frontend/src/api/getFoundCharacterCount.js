async function getFoundCharacterCount(gameId) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/game/${gameId}/found`);

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