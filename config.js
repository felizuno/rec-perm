module.exports = {
  // How long will the program wait between runs? (in minutes)
  SCRAPER_PROCESS_INTERVAL_MINUTES: 60,
  // The root domain which all relative paths are applied to
  ROOT_URL: "https://www.recreation.gov",
  // The entry point to the search process
  SEARCH_PATH: "/search?inventory_type=permits",
  // A CSS selector used to identify the search box a user would type in
  PERMIT_SEARCH_INPUT_SELECTOR: "#search-filters-search-input",
  // The term we will simulate typing into the search box
  PERMIT_SEARCH_TERM: "Idaho",
  // A CSS selector used to identify an individual search result (can match none, one, or many)
  PERMIT_SEARCH_RESULT_LINK_SELECTOR: "a.rec-flex-card-image-wrap",
  // A CSS selector used to close the intermittent feedback solicitation popup
  FEEDBACK_SOLICITATION_CLOSE_BUTTON_SELECTOR: '.QSIWebResponsive button[class$="close-btn"]',
  // A CSS selector used to infer what Month is displayed on the calendar
  CALENDAR_MONTH_LABEL_SELECTOR: '.permit-availability-calendar .CalendarMonth[data-visible="true"] .CalendarMonth_caption > strong',
  // A CSS selector used to click the calendar forward a month
  CALENDAR_MONTH_FORWARD_SELECTOR: '.sarsa-day-picker-range-controller-month-navigation-button.right',
  // A zero-based index for the month we want to start looking at (5 === June)
  DESIRED_STARTING_MONTH_INDEX: 5,
  // A zero-based index for the month we want to stop looking at (8 === September)
  DESIRED_ENDING_MONTH_INDEX: 8,
  // A CSS selector used to identify available days on the calendar
  AVAILABLE_CALENDAR_DAY_SELECTOR: '.CalendarMonth[data-visible="true"] .rec-available-day',
  // The name of the file that the output of a single run is written to
  OUTPUT_FILE_NAME: 'output.json',
  // Run Continuously?
  RUN_CONTINUOUSLY: true,
  // How long to wait between scrapes if running continuously
  TIME_BETWEEN_RUNS_MINUTES: 1,
};
