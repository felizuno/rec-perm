module.exports = async (page, CONFIG) => {    
    // Using the values from config.js, locate the search input and "type" our search into it
    await page.fill(
      CONFIG.PERMIT_SEARCH_INPUT_SELECTOR, // <input> to fill
      CONFIG.PERMIT_SEARCH_TERM, // value to fill it with
    );
  
    // We filled in the search box, but still need to submit the search
    await page.keyboard.press('Enter');
    
    // After we search the page will reload and render our results
    await page.waitForNavigation()
    // ... in practice it needs another second for results to render after the "load" event fired
    await page.waitForTimeout(1000) // 1k milliseconds => 1 minute
  
    // Identify and capture references to individual search results
    // Note that variables representing selected page elements are prefixed with a $
    const searchResults = await page.$$eval(
      CONFIG.PERMIT_SEARCH_RESULT_LINK_SELECTOR, // this will match 0, 1, or many results
      $results => $results.map($r => ({ // Iterate over each result to derive data from the matched element
        title: $r.getAttribute('alt'), // capture the alt text (the result title)
        href: $r.getAttribute('href'), // capture the href (link address if you clicked)
      })),
    );

    console.log('How many search results?', searchResults.length)

    return searchResults;
};
