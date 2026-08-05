// validates character id from request parameters and ensures that it returns a numerical id for other functions
function validateCharacterId(req, res, next) {
    const characterId = Number(req.params.characterId);

    if (Number.isNaN(characterId)) {
        const error = new Error('Invalid Character ID');
        error.status = 400;
        return next(error);
    };

    req.validatedCharacterId = characterId;
    next();
};

module.exports = validateCharacterId;