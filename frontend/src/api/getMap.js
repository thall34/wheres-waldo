async function getMap(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/map/${id}`);

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