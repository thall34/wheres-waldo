const prisma = require('../config/db');

// Gets top 10 high scores from the database
async function getHighScores() {
    const highScores = await prisma.game.findMany({
        take: 10,
        select: {
            userId: true,
            duration: true,
        },
        orderBy: {
            duration: 'asc',
        },
    });

    return highScores;
};

// Gets a single map from the database
async function getMap(id) {
    const map = await prisma.map.findUnique({
        where: { id: id },
        select: {
            id: true,
            cloudinaryPath: true,
        },
    });

    return map;
};

// Gets character coordinates for a single character
async function getCharacterById(id) {
    const character = await prisma.character.findUnique({
        where: { id: id },
        select: {
            xLeft: true,
            xRight: true,
            yTop: true,
            yBottom: true,
        },
    });
    
    return character;
};

async function getGame(id) {
    const game = await prisma.game.findUnique({
        where: { id: id },
        select: {
            id: true,
        },
    });

    return game;
};

// Gets all characters for a single map
async function getCharactersForMap(mapId) {
    const characters = await prisma.character.findMany({
        where: { mapId: mapId },
        select: {
            id: true,
            name: true,
        },
    });

    return characters;
};

// Gets all characters that have currently been found in the active game
async function getCharactersFromFoundTable(gameId) {
    const characters = await prisma.foundCharacter.findMany({
        where: { gameId: gameId },
        select: {
            characterId: true,
        },
    });

    return characters;
};

// Creates a new game instance in the database
async function createGame(mapId) {
    const game = await prisma.game.create({
        data: {
            userId: '',
            mapId: mapId,
        },
    });

    return game;
};

// Creates a new row in the found table for the active game and selected character
async function addCharacterToFoundTable(gameId, characterId) {
    const add = await prisma.foundCharacter.create({
        data: {
            gameId: gameId,
            characterId: characterId,
        },
    });

    return add;
};

// Updates the final time score once all characters are found
async function updateFinalScore(userId, endTime, duration, gameId) {
    const update = await prisma.game.update({
        where: { id: gameId },
        data: { 
            userId: userId,
            endTime: endTime,
            duration: duration,
        },
    });

    return update;
};

module.exports = {
    getHighScores,
    getMap,
    getCharacterById,
    getGame,
    getCharactersForMap,
    getCharactersFromFoundTable,
    createGame,
    addCharacterToFoundTable,
    updateFinalScore,
}