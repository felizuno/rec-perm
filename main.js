// Import Node modules or their constituent parts (see package.json)
require('dotenv').config()
const { firefox } = require('playwright');
const fs = require('fs');
// Import local code using relative paths (paths based on the location of this file)
const CONFIG = require('./config');
const handleProcessTermination = require('./subtasks/handleProcessTermination');
const getInitialSearchResults = require('./subtasks/getInitialSearchResults');
const handleIndividualSearchResult = require('./subtasks/handleIndividualSearchResult');
const findNewValuesSincePreviousRun = require('./subtasks/findNewValuesSincePreviousRun');
const sendEmailNotification = require('./subtasks/sendEmailNotification');
const wait = require('./subtasks/wait');

(async () => {
  console.log('YOUR SCRAPER IS NOW RUNNING...')
  // Run our script in a try/catch to make sure that it will exit (that is, not hang indefinitely) in all error conditions  
  try {
    // ==================
    //  Do some setup stuff first
    // ==================

    // Launch the headless browser
    const browser = await firefox.launch();
    
    // Make sure we clean up if the process exits unexpectedly
    handleProcessTermination(browser);

    // ==================
    // OK! Now we're ready to start scraping
    // ==================

    // Navigate the new page to the location we want to start
    const searchPage = await browser.newPage();
    await searchPage.goto(CONFIG.ROOT_URL + CONFIG.SEARCH_PATH);

    // Make our initial search
    const searchResults = await getInitialSearchResults(searchPage, CONFIG)

    // We're expecting to get > 0 search results, if we don't then throw an error and exit
    if (!searchResults || !searchResults.length) throw(new Error('NO SEARCH RESULTS! Re-running the script might fix this.'))

    // ==================
    // Now that we have the initial search results we can scrape them one or many times
    // ==================

    // Declare this here so it has shared context
    const singleScraperRun = async () => {
      const currentRunOutput = {};
      // Promise.all() allows us to wait for multiple simultaneous processes to finish before proceeding
      await Promise.all(searchResults.map(async (result) => {
        // Skip the powerboat options
        if (/Powerboat/.test(result.title)) return;

        const callback = (availableDays) => {
          currentRunOutput[result.title.replace(/\W/g, '')] = availableDays;
        };
  
        // Navigate to individual results pages
        const resultPage = await browser.newPage();
        await resultPage.goto(CONFIG.ROOT_URL + result.href);
  
        // Manipulate the calendar and capture availability
        await handleIndividualSearchResult(resultPage, CONFIG, callback);
  
        // Close the page now that we're done with it, we will open fresh ones on subsequent runs
        await resultPage.close();
      }));
  
      
      const newAvailability = await findNewValuesSincePreviousRun(currentRunOutput, CONFIG);
      
      // If there is anything new then try to email us
      if (Object.keys(newAvailability).length) {
        console.log('NEW AVAILABILITY!', newAvailability)
        sendEmailNotification(newAvailability);
      }
      
      // this way we know if our output file is getting stale under our nose
      currentRunOutput.timestamp = new Date().toString();
      
      // Save the entire run output, not just the new stuff. We need to compare to the next run.
      fs.writeFileSync(`./${CONFIG.OUTPUT_FILE_NAME}`, JSON.stringify(currentRunOutput));
      
      return currentRunOutput;
    };

    // ==================
    // Now that we know what to do when we scrape, choose to do it one or many times based on CONFIG
    // ==================

    if (CONFIG.RUN_CONTINUOUSLY) {
      // if you're ever unsure if this is still running then you can look at the timestamp in the output.json to be sure it is incrementing
      while (CONFIG.RUN_CONTINUOUSLY) {
        await singleScraperRun();
        await wait(CONFIG)
      }
    } else {
      // Just run a single scrape
      await singleScraperRun();
    }

    // Close the browser before we exit
    await browser.close();

    // Terminate the process without an error code
    process.exit(0);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
})();
