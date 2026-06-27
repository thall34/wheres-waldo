const prisma = require('../config/db');

async function getHighScores() {
    const highScores = await prisma.game.findMany({
        take: 10,
        orderBy: {
            duration: 'asc',
        },
    });

    return highScores;
};

async function getMap(id) {
    const map = await prisma.map.findUnique({
        where: { id: id },
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
        }
    });

    return characters;
};

async function updateFinalScore(name, endTime, duration, gameId) {
    const update = await prisma.game.update({
        where: { id: gameId },
        data: { 
            userId: name,
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
    updateFinalScore,
}