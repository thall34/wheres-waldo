import updateGameForWin from '../api/updateGameForWin';

function WinScreen({ game, setGame, setWin }) {
    async function submitGameDetails(e) {
        e.preventDefault();

        try {
            const success = await updateGameForWin(game);

            if (!success) {
                return null;
            };

            setGame(null);
            setWin(false);
        } catch (err) {
            return;
        };
    };

    return (
        <form onSubmit={submitGameDetails}>
            <h1>You Won!</h1>
            <label htmlFor="userId">Input your name for scoring: </label>
            <input type="text" name="userId" id="userId" onChange={(e) => setGame({ ...game, userId: e.target.value })} required />
            <button type="submit">Submit Score</button>
        </form>
    )
};

export default WinScreen;