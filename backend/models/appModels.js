const prisma = require('../config/db');

// gets all maps from database with high scores and characters
async function getMaps() {
    const maps = await prisma.map.findMany({
        select: {
            id: true,
            cloudinaryPath: true,
            games: {
                where: {
                    userId: {
                       not: '', 
                    },
                },
                select: {
                    userId: true,
                    duration: true,
                },
                orderBy: {
                    duration: 'asc',
                },
                take: 10,
            },
            characters: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });

    return maps;
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
    getMaps,
    getCharacterById,
    createGame,
    addCharacterToFoundTable,
    updateFinalScore,
}