const MULTIPLIER = 3;

const mapRevealDelay = (leaderboard) => {
  let delay = leaderboard.length * MULTIPLIER;
  let lastScore = null;
  // run through to determine number of positions
  return leaderboard.map((item) => {
    if (lastScore !== null && lastScore !== item.score) {
      delay -= MULTIPLIER;
    }

    lastScore = item.score;

    return {
      ...item,
      delay,
    };
  });
};

export default mapRevealDelay;
