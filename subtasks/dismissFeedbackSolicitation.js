module.exports = async (page, CONFIG) => {
  try {
    await page.$eval(CONFIG.FEEDBACK_SOLICITATION_CLOSE_BUTTON_SELECTOR, async $closeSolicitationButton => { 
      if ($closeSolicitationButton) {
        await page.screenshot({ path: `${pageTitle}-pre.png` }); // @TODO Only here for testing
        await $closeSolicitationButton.click()
        await page.screenshot({ path: `${pageTitle}-post.png` }); // @TODO Only here for testing
      }
    });
  } catch (e) {
    // we want to silence the error thrown if the solicitation is not found
  }
};
