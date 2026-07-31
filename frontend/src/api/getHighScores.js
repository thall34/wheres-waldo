async function getHighScores() {
    try {
        const response = await fetch('${import.meta.env.VITE_API_URL}/api/game/top');

        if (!response.ok) {
            return null;
        };

        const scores = await response.json();
        return scores;
    } catch (err) {
        return err;
    };
};

export default getHighScores;