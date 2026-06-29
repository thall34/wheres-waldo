const { Router } = require('express');
const appRouter = Router();
const validateId = require('../middleware/validateId');
const appController = require('../controllers/appController');

appRouter.get('/game/top', appController.getHighScores);
appRouter.get('/map/:id', validateId, appController.getMap);
appRouter.post('/game/:id', validateId, appController.createGame);
appRouter.get('/game/:id/found', validateId, appController.getFoundCharacters);
appRouter.post('/character/:id', validateId, appController.checkCoordinates);
appRouter.post('/game/:gameId/character/:characterId', appController.checkFoundCharacter);
appRouter.get('/character/map/:id', validateId, appController.getCharacters);
appRouter.put('/game/final/:id', validateId, appController.updateFinalScore);

module.exports = appRouter;