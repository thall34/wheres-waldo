async function getCharacters(mapId) {
    try {
        const response = await fetch(`http://localhost:3000/api/character/map/${mapId}`);

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