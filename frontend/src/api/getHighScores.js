async function getHighScores() {
    try {
        const response = await fetch('http://localhost:3000/api/game/top');

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