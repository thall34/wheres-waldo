const db = require('../models/appModels');

async function getHighScores(req, res, next) {
    try {
        const highScores = await db.getHighScores();
        return highScores;
    } catch(err) {
        next(err);
    };
};

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

module.exports = {
    getHighScores,
    getMap,
    createGame,
    checkCoordinates,
    getCharacterTotal,
}