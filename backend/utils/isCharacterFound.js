const normalizeCoordinate = require('./normalizeCoordinate');

function isCharacterFound(character, x, y, hitbox, width, height) {
    // gets the hitbox padding as the radius of the selection box in pixels
    const hitboxPad = hitbox / 2;
    // normalizes the bottom left, bottom right, top left and top right coordinates
    // of the logged coordinates for the character in the database
    const normalizedXLeft = normalizeCoordinate(character.xLeft, width);
    const normalizedXRight = normalizeCoordinate(character.xRight, width);
    const normalizedYTop = normalizeCoordinate(character.yTop, height);
    const normalizedYBottom = normalizeCoordinate(character.yBottom, height);
    // checks if the selection point is within the boundary of the normalized points with the hitbox pad
    if (x <= normalizedXRight + hitboxPad &&
        x >= normalizedXLeft - hitboxPad &&
        y >= normalizedYTop - hitboxPad &&
        y <= normalizedYBottom + hitboxPad) {
        // Returns true if character coordinates are within the bounds of the selection box
        return true
    }
    // Returns false if character coordinates are outside of the bounds of the selection box
    return false
};

module.exports = isCharacterFound;