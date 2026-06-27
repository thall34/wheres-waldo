const { Router } = require('express');
const appRouter = Router();
const validateId = require('../middleware/validateId');
const appController = require('../controllers/appController');

appRouter.get('/game/top', appController.getHighScores);
appRouter.get('/map/:id', validateId, appController.getMap);
appRouter.post('/game/:id', validateId, appController.createGame);
appRouter.post('/character/:id', validateId, appController.checkCoordinates);
appRouter.get('/character/total/:id', validateId, appController.getCharacterTotal);
appRouter.put('game/final/:id', validateId, appController.updateFinalScore);

module.exports = appRouter;