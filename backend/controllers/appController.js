const db = require('../models/appModels');
const success = require('../utils/success');
const failure = require('../utils/failure');

// Gets high scores from database
async function getHighScores(req, res, next) {
    try {
        const highScores = await db.getHighScores();
        return success(res, 200, 'High scores found', highScores);
    } catch(err) {
        next(err);
    };
};

// Gets single map from database
async function getMap(req, res, next) {
    const id = req.validatedId;

    try {
        // checks if map exists in database
        const map = await db.getMap(id);
        // if map doesn't exist return a 404 status
        if (!map) {
            return next(failure(404, 'Map not found'));
        };

        return success(res, 200, 'Map found', map);
    } catch(err) {
        next(err);
    };
};

// Gets characters for a single map
async function getCharacters(req, res, next) {
    const mapId = req.validatedId;

    try {
        // checks if map exists in database
        const map = await db.getMap(mapId);
        // if map doesn't exist return a 404 status
        if (!map) {
            return next(failure(404, 'Map not found'));
        };

        const characters = await db.getCharactersForMap(mapId);
        return success(res, 200, 'Characters found', characters);
    } catch(err) {
        next(err);
    };
};

// Gets the amount of characters found in the current game
async function getFoundCharacters(req, res, next) {
    const gameId = req.validatedId;

    try {
        // checks if game exists in database
        const game = await db.getGame(gameId);
        // if game doesn't exist return a 404 status
        if (!game) {
            return next(failure(404, 'Game not found'));
        };

        const characters = await db.getCharactersFromFoundTable(gameId);
        // returns a 200 status with how many characters have been found
        return success(res, 200, 'Amount of found characters', characters.length);
    } catch(err) {
        next(err);
    };
};

// Creates a new row in the game table of the database
async function createGame(req, res, next) {
    const mapId = req.validatedId;

    try {
        const game = await db.createGame(mapId);
        return success(res, 200, 'Game created', game);
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
        const { selectionCoords, hitbox, dimensions } = req.body;
        // gets the width and height in pixels of the map from the frontend
        const { width, height } = dimensions;
        // gets the x and y of the center point of the selection box
        const { x, y } = selectionCoords;
        // gets the hitbox padding as the radius of the selection box in pixels
        const hitboxPad = hitbox / 2;
        // normalizes the bottom left, bottom right, top left and top right coordinates
        // of the logged coordinates for the character in the database
        const normalizedXLeft = parseFloat(((character.xLeft / 100) * width).toFixed(2));
        const normalizedXRight = parseFloat(((character.xRight / 100) * width).toFixed(2));
        const normalizedYTop = parseFloat(((character.yTop / 100) * height).toFixed(2));
        const normalizedYBottom = parseFloat(((character.yBottom / 100) * height).toFixed(2));
        // checks if the selection point is within the boundary of the normalized points with the hitbox pad
        if (x <= normalizedXRight + hitboxPad && 
            x >= normalizedXLeft - hitboxPad && 
            y >= normalizedYTop - hitboxPad && 
            y <= normalizedYBottom + hitboxPad) 
        {
            // Returns true if character coordinates are within the bounds of the selection box
            return success(res, 200, 'Character found', true);
        }
        // Returns false if character coordinates are outside of the bounds of the selection box
        // return success(res, 200, 'Character not found', false);
        return next(failure(404, 'Character not found'));
    } catch(err) {
        next(err);
    };
};

// Creates a new row in the found character table with the active game and the selected character
async function checkFoundCharacter (req, res, next) {
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
            return next(failure(404, 'Character not found'));
        };
        // if game and character exist, add character to found table with game ID
        const creation = await db.addCharacterToFoundTable(gameId, characterId);
        return success(res, 200, 'Character added to found table', creation);
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
    getHighScores,
    getMap,
    getFoundCharacters,
    getCharacters,
    createGame,
    checkCoordinates,
    checkFoundCharacter,
    updateFinalScore,
}