// validates game id from request parameters and ensures that it returns a numerical id for other functions
function validateGameId(req, res, next) {
    const gameId = Number(req.params.gameId);

    if (Number.isNaN(gameId)) {
        const error = new Error('Invalid Game ID');
        error.status = 400;
        return next(error);
    };

    req.validatedGameId = gameId;
    next();
};

module.exports = validateGameId;