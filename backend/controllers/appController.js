const db = require('../models/appModels');
const success = require('../utils/success');
const failure = require('../utils/failure');
const isCharacterFound = require('../utils/isCharacterFound');

// gets all maps from the database
async function getMaps(req, res, next) {
    try {
        const maps = await db.getMaps();
        return success(res, 200, 'Maps found', maps);
    } catch(err) {
        next(err);
    };
};

// Creates a new row in the game table of the database
async function createGame(req, res, next) {
    const mapId = req.validatedId;

    try {
        const game = await db.createGame(mapId);
        return success(res, 201, 'Game created', game);
    } catch(err) {
        if (err.code === 'P2002') {
            return next(failure(400, 'Game id already in use'));
        };

        next(err);
    };
};

// Checks coordinates of selection against database coordinates to determine if that character was found
async function checkCoordinates(req, res, next) {
    const id = req.validatedId;

    try {
        // checks if character exists in database
        const character = await db.getCharacterById(id);
        // if character doesn't exist, returns a 404 status
        if (!character) {
            return next(failure(404, 'Character not found'));
        };
        // gets all the information from the frontend to calculate the selection box boundaries
        const { x, y, hitbox, width, height } = req.body;
        // checks if selection is within bounds of character coordinates in database
        const found = isCharacterFound(character, x, y, hitbox, width, height);
        if (found) {
            // Returns true if character coordinates are within the bounds of the selection box
            return success(res, 200, 'Character found');
        };
        // Returns false if character coordinates are outside of the bounds of the selection box
        return next(failure(404, 'Character not found at coordinates'));
    } catch(err) {
        next(err);
    };
};

// Creates a new row in the found character table with the active game and the selected character
async function addCharacterToFoundTable (req, res, next) {
    const gameId = req.validatedGameId;
    const characterId = req.validatedCharacterId;

    try {
        // checks if game exists in database
        const game = await db.getGame(gameId);
        // if game doesn't exist return a 404 status
        if (!game) {
            return next(failure(404, 'Game not found'));
        };
        // checks if character exists in database
        const character = await db.getCharacterById(characterId);
        // if character doesn't exist, returns a 404 status
        if (!character) {
            return next(failure(400, 'Incorrect selection'));
        };
        // if game and character exist, add character to found table with game ID
        const addCharacter = await db.addCharacterToFoundTable(gameId, characterId);
        return success(res, 200, 'Character added to found table', addCharacter);
    } catch(err) {
        if (err.code === 'P2002') {
            return next(failure(400, 'Character already found'));
        };

        next(err);
    };
};

// Updates game scores once all characters have been found
async function updateFinalScore(req, res, next) {
    const gameId = req.validatedId;
    const { userId, endTime, duration } = req.body;

    try {
        const update = await db.updateFinalScore(userId, endTime, duration, gameId);
        return success(res, 200, 'Final scores updated', update);
    } catch(err) {
        if (err.code === 'P2002') {
            return next(failure(400, 'Final score already created'));
        };

        next(err);
    };
};

module.exports = {
    getMaps,
    createGame,
    checkCoordinates,
    addCharacterToFoundTable,
    updateFinalScore,
}