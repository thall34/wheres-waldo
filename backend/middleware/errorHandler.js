const multer = require('multer');

function errorHandler(err, req, res, next) {
    console.error(err);

    // postSQL Database errors
    if (err.code) {
        return res.status(500).json({
            message: 'Error - 500: Database error occured',
        });
    };

    // fallback that returns the error with the appropriate error status and message
    return res.status(err.status).json({
        message: err.message,
    });
};

module.exports = errorHandler;