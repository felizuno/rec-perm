// Import Node modules or their constituent parts (see package.json)
require('dotenv').config()
const { firefox } = require('playwright');
const fs = require('fs');
// Import local code using relative paths (paths based on the location of this file)
const CONFIG = require('./config');
const getInitialSearchResults = require('./subtasks/getInitialSearchResults');
const handleIndividualSearchResult = require('./subtasks/handleIndividualSearchResult');

(async () => {
  // Run our script in a try/catch to make sure that it will exit (that is, not hang indefinitely) in all error conditions
  const start = Date.now();
  console.log(process.env.FOO)

  try {    
    // Launch the headless browser
    const browser = await firefox.launch();
    
    // Navigate the new page to the location we want to start
    const searchPage = await browser.newPage();
    await searchPage.goto(CONFIG.ROOT_URL + CONFIG.SEARCH_PATH);

    // Make our initial search
    const searchResults = await getInitialSearchResults(searchPage, CONFIG)

    const currentRunOutput = {};
    // Promise.all() allows us to wait for multiple simultaneous processes to finish before proceeding
    await Promise.all(searchResults.map(async (result) => {
      // Skip the powerboat options?
      if (/Powerboat/.test(result.title)) return;
      const callback = (availableDays) => {
        currentRunOutput[result.title.replace(/\W/g, '')] = availableDays;
      };

      // Navigate to individual results pages
      const resultPage = await browser.newPage();
      await resultPage.goto(CONFIG.ROOT_URL + result.href);

      // Manipulate the calendar and capture availability
      await handleIndividualSearchResult(resultPage, CONFIG, callback);
    }));
    
    const previousRunOutput = fs.existsSync(`./${CONFIG.OUTPUT_FILE_NAME}`) 
      ? JSON.parse(fs.readFileSync(`./${CONFIG.OUTPUT_FILE_NAME}`))
      : {};
    
    const newShitYay = {};

    Object.keys(currentRunOutput).forEach(river => {
      if (!previousRunOutput[river]) {
        newShitYay[river] = currentRunOutput[river];
      } else {
        Object.keys(currentRunOutput[river]).forEach(month => {
          if (!previousRunOutput[river][month]) {
            newShitYay[river] = newShitYay[river] || {};
            newShitYay[river][month] = currentRunOutput[river][month];
          } else {
            currentRunOutput[river][month].forEach(dayNumber => {
              if (!previousRunOutput[river][month].includes(dayNumber)) {
                newShitYay[river] = newShitYay[river] || {};
                newShitYay[river][month] = newShitYay[river][month] || [];
                newShitYay[river][month].push(dayNumber);
              }
            })

          }
        });
      }
    });

    console.log('NEW STUFF', newShitYay)
    // await page.screenshot({ path: `example.png` });
    await browser.close();
    
    // this way we know if our output file is gettng stale under our nose
    currentRunOutput.timestamp = Date.now();
    
    fs.writeFileSync(`./${CONFIG.OUTPUT_FILE_NAME}`, JSON.stringify(currentRunOutput));

    console.log(`RUN TIME: ${(Date.now() - start)/1000}s`)
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
})();
