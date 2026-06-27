const db = require('../models/appModels');

async function getHighScores(req, res, next) {
    try {
        const highScores = await db.getHighScores();
        res.status(200).json(highScores);
    } catch(err) {
        next(err);
    };
};

// may have to limit what I return from this so frontend cant expose characters and coordinates
async function getMap(req, res, next) {
    const id = req.validatedId;

    try {
        const map = await db.getMap(id);

        if (!map) {
            return null;
        };

        res.status(200).json(map);
    } catch(err) {
        next(err);
    };
};

async function createGame(req, res, next) {
    const mapId = req.validatedId;

    try {
        const game = await db.createGame(mapId);
        return game.id;
    } catch(err) {
        next(err);
    };
};
async function checkCoordinates(req, res, next) {
    const id = req.validatedId;

    try {
        const { xLeft, xRight, yTop, yBottom } = await db.checkCoordinates();
        const normalizedXLeft = parseFloat(((xLeft / 100) * dimensions.width).toFixed(2));
        const normalizedXRight = parseFloat(((xRight / 100) * dimensions.width).toFixed(2));
        const normalizedYTop = parseFloat(((yTop / 100) * dimensions.height).toFixed(2));
        const normalizedYBottom = parseFloat(((yBottom / 100) * dimensions.height).toFixed(2));
        const { selectionCoords, hitbox, dimensions } = req.body;
        const { width, height } = dimensions;
        const { x, y } = selectionCoords;
        const hitboxPad = hitbox / 2
        if (x <= normalizedXRight + (hitboxPad / 2) && 
            x >= normalizedXLeft - (hitboxPad / 2) && 
            y >= normalizedYTop - (hitboxPad / 2) && 
            y <= normalizedYBottom + (hitboxPad / 2)) 
        {
            return true;
        }

        return false;
    } catch(err) {
        next(err);
    };
};

async function getCharacters(req, res, next) {
    const mapId = req.validatedId;

    try {
        const characters = await db.getCharactersForMap(mapId);
        res.status(200).json(characters)
    } catch(err) {
        next(err);
    };
};

async function updateFinalScore(req, res, next) {
    const gameId = req.validatedId;
    const { name, endTime, duration } = req.body;

    try {
        const update = await db.updateGame(name, endTime, duration, gameId);
    } catch(err) {
        if (err.code === 'P2025') {
            const error = new Error('Comment Not Found');
            error.status = 404;
            return next(error);
        };

        next(err);
    };
};

module.exports = {
    getHighScores,
    getMap,
    createGame,
    checkCoordinates,
    getCharacters,
    updateFinalScore,
}