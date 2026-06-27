async function getMapUrl(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/map/${id}`);

        if (!response.ok) {
            return null;
        };

        const map = await response.json();
        return map.cloudinaryPath;
    } catch (err) {
        return err;
    };
};

export default getMapUrl;