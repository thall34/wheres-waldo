const db = require('../models/appModels');

async function getHighScores(req, res, next) {
    try {
        const highScores = await db.getHighScores();
        return res.status(200).json(highScores);
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

        return res.status(200).json(map);
    } catch(err) {
        next(err);
    };
};

async function createGame(req, res, next) {
    const mapId = req.validatedId;

    try {
        const game = await db.createGame(mapId);

        if (!game) {
            return null;
        };

        return res.status(200).json(game);
    } catch(err) {
        next(err);
    };
};
async function checkCoordinates(req, res, next) {
    const id = req.validatedId;

    try {
        const { xLeft, xRight, yTop, yBottom } = await db.getCharacterById(id);
        const { selectionCoords, hitbox, dimensions } = req.body;
        const { width, height } = dimensions;
        const { x, y } = selectionCoords;
        const hitboxPad = hitbox / 2;
        const normalizedXLeft = parseFloat(((xLeft / 100) * dimensions.width).toFixed(2));
        const normalizedXRight = parseFloat(((xRight / 100) * dimensions.width).toFixed(2));
        const normalizedYTop = parseFloat(((yTop / 100) * dimensions.height).toFixed(2));
        const normalizedYBottom = parseFloat(((yBottom / 100) * dimensions.height).toFixed(2));
        
        if (x <= normalizedXRight + hitboxPad && 
            x >= normalizedXLeft - hitboxPad && 
            y >= normalizedYTop - hitboxPad && 
            y <= normalizedYBottom + hitboxPad) 
        {
            return res.status(200).json(true);
        }

        return res.status(200).json(false);
    } catch(err) {
        next(err);
    };
};

// need to figure out how to validate both of these
async function checkFoundCharacter (req, res, next) {
    const { gameId, characterId } = req.params;

    try {
        const success = await db.addCharacterToFoundTable(Number(gameId), Number(characterId));

        if (!success) {
            return null
        };

        return res.status(200).json(success);
    } catch(err) {
        next(err)
        return res.status(400).json('Already Found')
    };
};

async function getCharacters(req, res, next) {
    const mapId = req.validatedId;

    try {
        const characters = await db.getCharactersForMap(mapId);
        return res.status(200).json(characters)
    } catch(err) {
        next(err);
    };
};

async function getFoundCharacters(req, res, next) {
    const gameId = req.validatedId;

    try {
        const characters = await db.getCharactersFromFoundTable(gameId);
        return res.status(200).json(characters.length);
    } catch(err) {
        next(err);
    };
};

async function updateFinalScore(req, res, next) {
    const gameId = req.validatedId;
    const { userId, endTime, duration } = req.body;

    try {
        const update = await db.updateFinalScore(userId, endTime, duration, gameId);
        return res.status(200).json(update)
    } catch(err) {
        if (err.code === 'P2025') {
            const error = new Error('Failed updating game details');
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
    checkFoundCharacter,
    getFoundCharacters,
    getCharacters,
    updateFinalScore,
}