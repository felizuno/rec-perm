const dismissFeedbackSolicitation = require('./dismissFeedbackSolicitation');

const MONTH_DISPLAY_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

module.exports = async (page, CONFIG) => {
  const pageTitle = await page.$eval('h1', $h1 => $h1.innerText);
  
  console.log(`On ${pageTitle}...`);
  
  await dismissFeedbackSolicitation(page, CONFIG)
  
  // We're going to reuse this function a lot
  const getCalendarMonthIndex = async () => {
    // Read the label on the visible calendar
    const calendarLabel = await page.$eval(
      CONFIG.CALENDAR_MONTH_LABEL_SELECTOR,
      $label => $label.innerText,
    );
    
    // Convert the string label to a Date object and read the month index (zero-based)
    return new Date(calendarLabel).getMonth();
  };

  const stepCalendarForwardAndWait = async () => {
    // Click the "forward" button
    await page.$eval(
      CONFIG.CALENDAR_MONTH_FORWARD_SELECTOR,
      $forwardButton => $forwardButton.click(),
    );
    // Give it a few seconds to chill out in case the internet is slow (no "load" event here)
    await page.waitForTimeout(2000);
  };
  
  // Step the calendar forward to June
  while (await getCalendarMonthIndex() < CONFIG.DESIRED_STARTING_MONTH_INDEX) {
    stepCalendarForwardAndWait();
  };

  // Run this code once per month until we're on the last month
  var availableDays = [];
  while (await getCalendarMonthIndex() < CONFIG.DESIRED_ENDING_MONTH_INDEX) {
    availableDays = await page.$$eval(
      CONFIG.AVAILABLE_CALENDAR_DAY_SELECTOR,
      $availableDays => $availableDays.reduce((acc, $day) => {
        if ($day.innerText) acc.push($day.innerText.split('\n').join(''))
        return acc;
      }, []),
    );

    if (availableDays.length) {
      const monthName = MONTH_DISPLAY_NAMES[await getCalendarMonthIndex()];
      console.log(`${pageTitle}: ${monthName} - ${JSON.stringify(availableDays)}`)
      // await page.screenshot({ path: `./img/${pageTitle}_${monthName}.png` });
    }

    // Move forward to the next month
    stepCalendarForwardAndWait();
  };
};
