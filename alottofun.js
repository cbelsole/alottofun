'use strict';

const puppeteer = require('puppeteer');

(async() => {
  const browser = await puppeteer.launch({headless: false, timeout: 6000});
  const page = await browser.newPage();

  try {
    await page.goto('https://twitter.com/login');
    await page.waitForSelector('.js-username-field')
    await page.click('.js-username-field')
    await page.type('<twitter username>')
    await page.waitFor(1000)
    await page.click('.js-password-field')
    await page.type('<twitter password>')
    await page.click('.js-signin .submit')
    await page.waitFor('.DashboardProfileCard-avatarLink')
    await page.goto('https://my.socialtoaster.com/st/campaign_landing/?key=dearevanhansenlottery');
    await page.waitFor('#st_campaign_cta_signup_button_twitter')
    await page.click('#st_campaign_cta_signup_button_twitter')
    await page.waitFor('#st_contest_tab_events')
    await page.click('#st_contest_tab_events')
    const text = await page.evaluate(lotteryDescription => lotteryDescription.innerHTML, await page.$('.lottery_available_description'));
    await console.log(text)
  } catch(e) {
    console.log(e)
  } finally {
    await browser.close();
  }
})();
