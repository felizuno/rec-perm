module.exports = async (page, CONFIG) => {
  const availableDays = await page.$$eval(
    CONFIG.AVAILABLE_CALENDAR_DAY_SELECTOR,
    $availableDays => $availableDays.reduce((acc, $day) => {
      // if the day is a match, format its content
      // Make sure it both has text and has an "A"
      if ($day.innerText && /A/.test($day.innerText)) {
        // We only want the digits of the day, so drop all non-digit characters
        acc.push(parseInt($day.innerText.replace(/\D+/, ''), 10));
      } 
      
      // this is important or .reduce() falls apart
      return acc;
    }, []),
  );
  
  return availableDays;
};
