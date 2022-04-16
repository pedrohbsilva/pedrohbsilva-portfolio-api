import { Request, Response } from 'express';
import Puppeteer from 'puppeteer';
import { config } from 'dotenv';
import getSelector from './selectors';
import login from './login';
import profile from './profile';
import newLogger from './logger';
import openPage from './openPage';
import scrollToPageBottom from './scrollToPageBottom';
import clickAll from './profile/seeMoreButtons';
import template from './profile/profileScraperTemplate';

class LinkedinDataController {
  constructor() {
    this.enviroments();
  }

  private enviroments() {
    config();
  }

  public async getData(_: Request, res: Response) {
    const browser = await Puppeteer.launch({
      headless: false,
      slowMo: 50,
      timeout: 30000,
    });

    await login(browser);

    const logger = newLogger(__filename);
    logger.info(
      `starting scraping url: https://www.linkedin.com/in/pedro-h-b-da-silva/`,
    );

    const page = await openPage({
      browser,
      url: 'https://www.linkedin.com/in/pedro-h-b-da-silva/',
    });
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

    await clickAll(page);
    // const formatJsonWithOnlyJob = (data: (string | null)[]) => {
    //   console.log(data)
    //   const array = Object.assign(
    //     {},
    //     ...['role', 'company', 'time'].map((key, index) => ({
    //       [key]: data[index],
    //     })),
    //   );
    //   return array;
    // };
    const experience = await page.evaluate(() => {
      const nodeList = document.querySelector('div#experience');
      const parentUl = nodeList?.parentNode?.querySelectorAll('ul > li > div');
      const listLi = Array.from(parentUl as ArrayLike<Element>);
      const onlyLiWithData = listLi
        .filter(li => li.className.includes('pvs-entity--padded'))
        .map(li => {
          const spanList = Array.from(
            li.querySelectorAll('span') as ArrayLike<Element>,
          );
          const spanListFilter = spanList.filter(
            span =>
              span.className !== '' &&
              span.className !== 'visually-hidden' &&
              span.className !== 'pvs-entity__path-node',
          );

          const result = spanListFilter.map((span, index) => {
            if (span.className.includes('hoverable-link-text') && index === 0) {
              return {
                company: span.getElementsByTagName('span')[0]?.textContent,
              };
            }
            if (
              span.className.includes('t-normal') &&
              !span.className.includes('t-black--light') &&
              spanListFilter.length < 6
            ) {
              return {
                company: span.getElementsByTagName('span')[0]?.textContent,
              };
            }
            if (
              span.className.includes('t-normal') &&
              index === 1 &&
              spanListFilter.length > 6
            ) {
              return {
                allTime: span.getElementsByTagName('span')[0]?.textContent,
              };
            }
            if (span.className.includes('t-bold') && index !== 1) {
              return {
                role: span.getElementsByTagName('span')[0]?.textContent,
              };
            }
            if (span.className.includes('white-space-pre')) {
              return undefined;
            }
            return span;
          });
          return result;

          // const spanListFilter = spanList
          //   .filter(span => span.className === '')
          //   .map(span => span.textContent);
          // return spanListFilter;

          // if (spanListFilter.length === 1) {
          //   return undefined;
          // }

          // const json = Object.assign(
          //   {},
          //   ...['role', 'company', 'time'].map((key, index) => ({
          //     [key]: spanListFilter[index],
          //   })),
          // );

          // return json;
        });
      console.log(onlyLiWithData);
      return '';
    });
    // const [experienceData] = await page.$$eval('section > #experience', el => {
    //   console.log(el);
    //   const nodelis = el.map(element => {
    //     const nodeList = element.;
    //     return nodeList;
    //   });
    //   const test = [...nodelis];
    //   return test;
    // });
    // await page.waitForXPath(
    //   '//*[contains(concat( " ", @class, " " ), concat( " ", "break-words", " " ))]',
    // );
    // const elHandle = await page.$x(
    //   '//*[contains(concat( " ", @class, " " ), concat( " ", "break-words", " " ))]',
    // );

    // Object.keys(template.profile.fields).map((item)=>{

    // })
    // const scrapedPromises = sectionSelectors.map(selector =>
    //   scrapSelector(selector, section),
    // );
    // const lamudiNewPropertyCount = await page.evaluate(
    //   el => el.textContent,
    //   elHandle[0],
    // );

    // console.log(lamudiNewPropertyCount);
    // const scrapedPromises = await element?.evaluate(el => {
    //   console.log(template.profile.selector);
    //   return el.textContent;
    // });
    // console.log(scrapedPromises?.trim());

    // await profile(browser, getSelector('LINKEDIN_PROFILE_URL'));

    // await page.setViewport({
    //   width: 1200,
    //   height: 800,
    // });
    // await page.goto(getSelector('LINKEDIN_LOGIN_URL'), {
    //   waitUntil: 'domcontentloaded',
    // });
    // await page.click(getSelector('EMAIL_SELECTOR'), {
    //   delay: 2000,
    //   clickCount: 3,
    // });
    // await page.keyboard.type(process.env.LINKEDIN_EMAIL);
    // await page.click(getSelector('PASSWORD_SELECTOR'), {
    //   delay: 2000,
    //   clickCount: 3,
    // });
    // await page.keyboard.type(process.env.LINKEDIN_PASSWORD);
    // await page.click(getSelector('SUBMIT_SELECTOR'));
    // await page.goto(getSelector('LINKEDIN_PROFILE_URL'), {
    //   timeout: 10000,
    //   waitUntil: 'domcontentloaded',
    // });

    // const listScraper = [
    //   getSelector('LINKEDIN_NAME'),
    //   getSelector('LINKEDIN_TITLE'),
    //   getSelector('LINKEDIN_ABOUT'),
    //   getSelector('LINKEDIN_EXPERIENCE'),
    // ];

    // await scrollToPageBottom(page);
    // const test = await page.evaluate(() => {
    //   const nodeList = document.querySelectorAll(
    //     'section.artdeco-card.ember-view.break-words.pb3.mt4 div ul.pvs-list.ph5.display-flex.flex-row.flex-wrap li.artdeco-list__item div.pvs-entity.pvs-entity--padded.pvs-list__item--no-padding-when-nested div div span span',
    //   );
    //   const getTest = [...nodeList];
    //   const newList = getTest.map(({ innerText }: any) => {
    //     console.log(innerText);
    //     return innerText;
    //   });
    //   console.log('oi');
    //   console.log(getTest);
    //   return newList;
    // });

    // const result = await Promise.all(
    //   listScraper.map(async item => {
    //     const element = await page.waitForSelector(item);
    //     const text = await element?.evaluate(el => el.textContent);
    //     return text?.trim();
    //   }),
    // );

    return res.status(200).json({ result: 'experience' });
  }
}

export default new LinkedinDataController();
