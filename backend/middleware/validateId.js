// validates id from request parameters and ensures that it returns a numerical id for other functions
function validateId(req, res, next) {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        const error = new Error('Invalid ID');
        error.status = 400;
        return next(error);
    };

    req.validatedId = id;
    next();
};

module.exports = validateId;