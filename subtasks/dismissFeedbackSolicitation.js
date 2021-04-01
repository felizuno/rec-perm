module.exports = async (page, CONFIG) => {
  try {
    await page.$eval(CONFIG.FEEDBACK_SOLICITATION_CLOSE_BUTTON_SELECTOR, async $closeSolicitationButton => { 
      if ($closeSolicitationButton) await $closeSolicitationButton.click()
    });
  } catch (e) {
    // This space intentionally left empty...
    // we want to silence the error thrown if the solicitation is not found
  }
};
