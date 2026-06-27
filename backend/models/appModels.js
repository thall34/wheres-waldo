const prisma = require('../config/db');

async function getHighScores() {
    const highScores = await prisma.game.findMany({
        take: 10,
        orderBy: {
            duration: 'asc',
        },
    });
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
};

async function getCharactersForMap(mapId) {
    const characters = await prisma.character.findMany({
        where: { mapId: mapId },
    });
};

module.exports = {
    getHighScores,
    getMap,
    createGame,
    getCharacterById,
    getCharactersForMap,
}