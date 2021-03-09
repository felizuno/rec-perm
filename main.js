// Import Node modules or their constituent parts (see package.json)
const { webkit } = require('playwright');

// Import local code using relative paths (paths based on the location of this file)
const CONFIG = require('./config');
const getInitialSearchResults = require('./subtasks/getInitialSearchResults');
const handleIndividualSearchResult = require('./subtasks/handleIndividualSearchResult');

(async () => {
  // Run our script in a try/catch to make sure that it will exit (that is, not hang indefinitely) in all error conditions
  try {    
    // Launch the headless browser
    const browser = await webkit.launch();
    
    // Make our initial search
      // Navigate the new page to the location we want to start
    const searchPage = await browser.newPage();
    await searchPage.goto(CONFIG.ROOT_URL + CONFIG.SEARCH_PATH);
    const searchResults = await getInitialSearchResults(searchPage, CONFIG)

    await Promise.all(searchResults.map(async (result) => {
      if (/Powerboat/.test(result.title)) return;
      
      const resultPage = await browser.newPage();
      await resultPage.goto(CONFIG.ROOT_URL + result.href);
      await handleIndividualSearchResult(resultPage, CONFIG)
    }));
    

    // await page.screenshot({ path: `example.png` });
    await browser.close();
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
})();
