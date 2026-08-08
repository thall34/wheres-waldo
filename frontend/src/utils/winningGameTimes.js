function winningGameTimes(game) {
    const endTime = new Date();
    const startTime = new Date(game.startTime);
    
    return {
        ...game,
        endTime,
        duration: endTime - startTime,
    };
};

export default winningGameTimes;