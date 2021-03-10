module.exports = async (page, CONFIG) => {
  // Read the label on the visible calendar
  const calendarLabel = await page.$eval(
    CONFIG.CALENDAR_MONTH_LABEL_SELECTOR,
    $label => $label.innerText,
  );
  
  // Convert the string label to a Date object and read the month index (zero-based)
  return new Date(calendarLabel).getMonth();
};
