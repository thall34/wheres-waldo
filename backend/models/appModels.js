const prisma = require('../config/db');

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

async function createGame(mapId) {
    const game = await prisma.game.create({
        data: {
            userId: '',
            mapId: mapId,
        },
    });

    return game;
};

async function getCharacterById(id) {
    const character = await prisma.character.findUnique({
        where: { id: id },
    });

    return character;
};

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

async function addCharacterToFoundTable(gameId, characterId) {
    const add = await prisma.foundCharacter.create({
        data: {
            gameId: gameId,
            characterId: characterId,
        },
    });

    return add;
};

async function getCharactersFromFoundTable(gameId) {
    const characters = await prisma.foundCharacter.findMany({
        where: { gameId: gameId },
        select: {
            characterId: true,
        },
    });

    return characters;
};

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
    createGame,
    getCharacterById,
    getCharactersForMap,
    addCharacterToFoundTable,
    getCharactersFromFoundTable,
    updateFinalScore,
}