const { Router } = require('express');
const appRouter = Router();
const validateId = require('../middleware/validateId');
const validateGameId = require('../middleware/validateGameId');
const validateCharacterId = require('../middleware/validateCharacterId');
const appController = require('../controllers/appController');

appRouter.get('/map', appController.getMaps);
appRouter.post('/game/:id', validateId, appController.createGame);
appRouter.post('/character/:id', validateId, appController.checkCoordinates);
appRouter.post('/game/:gameId/character/:characterId', validateGameId, validateCharacterId, appController.addCharacterToFoundTable);
appRouter.put('/game/final/:id', validateId, appController.updateFinalScore);

module.exports = appRouter;