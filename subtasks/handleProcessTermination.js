module.exports = (browser) => {
  const exitHandler = (unplanned) => {
    if (unplanned) browser.close();
    console.log(' ...YOUR SCRAPER IS NOW TERMINATED');
    process.exit();
  };

  // This is the "happy path" exit
  process.on('exit', exitHandler);

  //catches ctrl+c event
  process.on('SIGINT', () => exitHandler(true));

  // catches "kill pid" (for example: nodemon restart)
  process.on('SIGUSR1', () => exitHandler(true));
  process.on('SIGUSR2', () => exitHandler(true));

  //catches uncaught exceptions
  process.on('uncaughtException', () => exitHandler(true));
};
