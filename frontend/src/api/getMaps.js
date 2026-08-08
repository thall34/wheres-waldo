async function getMaps(id) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/map`);

        if (!response.ok) {
            return null;
        };

        const maps = await response.json();
        return maps;
    } catch (err) {
        return err;
    };
};

export default getMaps;