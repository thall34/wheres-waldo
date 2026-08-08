function scoreDisplay(score) {
    return `${score.userId}: ${Math.floor(score.duration / 60000)}:${String(Math.floor((score.duration % 60000) / 1000)).padStart(2, '0')}`
}

export default scoreDisplay;