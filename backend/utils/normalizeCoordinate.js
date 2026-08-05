function normalizeCoordinate(coordinate, size) {
    return parseFloat(((coordinate / 100) * size).toFixed(2));
}

module.exports = normalizeCoordinate;