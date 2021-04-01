const timeout = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

module.exports = async (minutes) => {
  const waitMilliseconds = minutes * 60 * 1000;
  await timeout(waitMilliseconds);
};
