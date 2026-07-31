async function getMap(id) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/map/${id}`);

        if (!response.ok) {
            return null;
        };

        const map = await response.json();
        return map;
    } catch (err) {
        return err;
    };
};

export default getMap;