const dismissFeedbackSolicitation = require('./dismissFeedbackSolicitation');
const getCurrentCalendarMonthAsIndex = require('./getCurrentCalendarMonthAsIndex');
const stepCalendarForwardAndWait = require('./stepCalendarForwardAndWait');
const checkForAvailableDays = require('./checkForAvailableDays');

const MONTH_DISPLAY_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

module.exports = async (page, CONFIG) => {
  // h1 is a specific element used to convey the primary title of a page
  const pageTitle = await page.$eval('h1', $h1 => $h1.innerText);
  
  console.log(`On ${pageTitle}...`);
  
  // Sometimes there is a feedback popup that takes over the page.
  // This will dismiss it if it appears.
  await dismissFeedbackSolicitation(page, CONFIG)

  // Step the calendar forward to June
  while (await getCurrentCalendarMonthAsIndex(page, CONFIG) < CONFIG.DESIRED_STARTING_MONTH_INDEX) {
    await stepCalendarForwardAndWait(page, CONFIG);
  };

  // Run this code once per month until we're on the last month
  while (await getCurrentCalendarMonthAsIndex(page, CONFIG) <= CONFIG.DESIRED_ENDING_MONTH_INDEX) {
    // Scan the currently shown calendar month for availability
    const availableDays = await checkForAvailableDays(page, CONFIG);

    // Only run this code if > 0 available days are found
    if (availableDays.length) {
      // Resolve the month index to a human readable string
      const monthName = MONTH_DISPLAY_NAMES[await getCurrentCalendarMonthAsIndex(page, CONFIG)];

      console.log(`${pageTitle}: ${monthName} - ${JSON.stringify(availableDays)}`)
    }

    // Move forward to the next month and repeat the loop
    // NOTE: the last iteration will move the calendar one month past the desired end month, but it is not scraped
    await stepCalendarForwardAndWait(page, CONFIG);
  };
};
