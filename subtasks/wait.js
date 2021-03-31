const timeout = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

module.exports = async (CONFIG) => {
  const waitMilliseconds = CONFIG.TIME_BETWEEN_RUNS_MINUTES * 60 * 1000;
  await timeout(waitMilliseconds);
};
