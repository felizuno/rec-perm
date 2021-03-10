module.exports = async (page, CONFIG) => {
  const availableDays = await page.$$eval(
    CONFIG.AVAILABLE_CALENDAR_DAY_SELECTOR,
    $availableDays => $availableDays.reduce((acc, $day) => {
      if ($day.innerText) acc.push($day.innerText.split('\n').join(''))
      return acc;
    }, []),
  );
  
  return availableDays;
};
