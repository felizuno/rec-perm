module.exports = async (page, CONFIG) => {
  // Click the "forward" button
  await page.$eval(
    CONFIG.CALENDAR_MONTH_FORWARD_SELECTOR,
    $forwardButton => $forwardButton.click(),
  );

  // Give it a few seconds to chill out in case the internet is slow (no "load" event here)
  await page.waitForTimeout(2000);
};
