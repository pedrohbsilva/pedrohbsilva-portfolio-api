import { Browser } from 'puppeteer';
import newLogger from '../logger';
import openPage from '../openPage';
import scrollToPageBottom from '../scrollToPageBottom';
import clickAll from './seeMoreButtons';
import template from './profileScraperTemplate';
import scrapSection from '../scrapSection';
// const scrapSection = require('../scrapSection');
// const scrapAccomplishmentPanel = require('./scrapAccomplishmentPanel');
// const scrollToPageBottom = require('./scrollToPageBottom');
// const seeMoreButtons = require('./seeMoreButtons');
// const contactInfo = require('./contactInfo');
// const template = require('./profileScraperTemplate');
// const cleanProfileData = require('./cleanProfileData');

const profile = async (
  browser: Browser,
  url: string,
  waitTimeToScrapMs = 500,
  hasToGetContactInfo = false,
): Promise<any> => {
  const logger = newLogger(__filename);
  logger.info(`starting scraping url: ${url}`);

  const page = await openPage({ browser, url });
  const profilePageIndicatorSelector = 'div';
  await page
    .waitForSelector(profilePageIndicatorSelector, { timeout: 5000 })
    .catch(() => {
      // why doesn't throw error instead of continuing scraping?
      // because it can be just a false negative meaning LinkedIn only changed that selector but everything else is fine :)
      logger.warn('profile selector was not found');
    });

  logger.info('scrolling page to the bottom');
  await scrollToPageBottom(page);

  if (waitTimeToScrapMs) {
    logger.info(`applying 1st delay`);
    await new Promise(resolve => {
      setTimeout(() => {
        resolve(page);
      }, waitTimeToScrapMs / 2);
    });
  }

  await clickAll(page);

  // if (waitTimeToScrapMs) {
  //   logger.info(`applying 2nd (and last) delay`);
  //   await new Promise(resolve => {
  //     setTimeout(() => {
  //       resolve();
  //     }, waitTimeToScrapMs / 2);
  //   });
  // }

  const newProfile = await scrapSection(page, template.profile);
  // const [about] = await scrapSection(page, template.about);
  // const positions = await scrapSection(page, template.positions);
  // const educations = await scrapSection(page, template.educations);
  // const [recommendationsCount] = await scrapSection(
  //   page,
  //   template.recommendationsCount,
  // );
  // const recommendationsReceived = await scrapSection(
  //   page,
  //   template.recommendationsReceived,
  // );
  // const recommendationsGiven = await scrapSection(
  //   page,
  //   template.recommendationsGiven,
  // );
  // const skills = await scrapSection(page, template.skills);
  // const accomplishments = await scrapSection(page, template.accomplishments);
  // const courses = await scrapAccomplishmentPanel(page, 'courses');
  // const languages = await scrapAccomplishmentPanel(page, 'languages');
  // const projects = await scrapAccomplishmentPanel(page, 'projects');
  // const volunteerExperience = await scrapSection(
  //   page,
  //   template.volunteerExperience,
  // );
  // const peopleAlsoViewed = await scrapSection(page, template.peopleAlsoViewed);
  // const contact = hasToGetContactInfo ? await contactInfo(page) : [];

  // await page.close();
  // logger.info(`finished scraping url: ${url}`);

  // const rawProfile = {
  //   profile,
  //   about,
  //   positions,
  //   educations,
  //   skills,
  //   recommendations: {
  //     givenCount: recommendationsCount ? recommendationsCount.given : '0',
  //     receivedCount: recommendationsCount ? recommendationsCount.received : '0',
  //     given: recommendationsReceived,
  //     received: recommendationsGiven,
  //   },
  //   accomplishments,
  //   courses,
  //   languages,
  //   projects,
  //   peopleAlsoViewed,
  //   volunteerExperience,
  //   contact,
  // };

  // const cleanedProfile = cleanProfileData(rawProfile);
  // return cleanedProfile;
};

export default profile;
