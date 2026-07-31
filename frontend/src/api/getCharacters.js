async function getCharacters(mapId) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/character/map/${mapId}`);

        if (!response.ok) {
            return null;
        };

        const characters = await response.json();
        return characters;
    } catch (err) {
        return err;
    };
};

export default getCharacters;