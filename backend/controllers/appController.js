const db = require('../models/appModels');

async function getHighScores(req, res, next) {
    try {
        const highScores = await db.getHighScores();
        return highScores;
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

        return map;
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
        const { x, y, hitbox } = req.body;
        const hitboxPad = hitbox / 2
        if (x <= xRight + hitboxPad && 
            x >= xLeft - hitboxPad && 
            y >= yTop - hitboxPad && 
            y <= yBottom + hitboxPad) {
            return true;
        };

        return false;
    } catch(err) {
        next(err);
    };
};

async function getCharacterTotal(req, res, next) {
    const mapId = req.validatedId;

    try {
        const characters = await db.getCharactersForMap(mapId);
        return characters.length;
    } catch(err) {
        next(err);
    };
};

async function updateFinalScore(req, res, next) {
    const gameId = req.validatedId;
    const { name, endTime, duration } = req.body;
    const 

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
    getCharacterTotal,
    updateFinalScore,
}