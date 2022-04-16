import { Browser } from 'puppeteer';
import openPage from './openPage';
import logger from './logger';
import getSelector from './selectors';

const login = async (browser: Browser): Promise<void> => {
  const newLogger = logger(__filename);
  const url = 'https://www.linkedin.com/login';
  const page = await openPage({ browser, url });
  newLogger.info(`logging at: ${url}`);
  await page.goto(url);
  await page.waitForSelector(getSelector('EMAIL_SELECTOR'), { timeout: 3000 });
  await page.waitForSelector(getSelector('PASSWORD_SELECTOR'), {
    timeout: 3000,
  });

  await page.click(getSelector('EMAIL_SELECTOR'), {
    delay: 2000,
    clickCount: 3,
  });
  await page.keyboard.type(process.env.LINKEDIN_EMAIL);
  await page.click(getSelector('PASSWORD_SELECTOR'), {
    delay: 2000,
    clickCount: 3,
  });
  await page.keyboard.type(process.env.LINKEDIN_PASSWORD);
  await page.waitForSelector('#username');

  await page
    .$x("//button[contains(text(), 'Sign in')]")
    .then(button => button[0].click());

  return (
    page
      .waitForSelector('input[role=combobox]', {
        timeout: 15000,
      })
      .then(async () => {
        newLogger.info('logged feed page selector found');
        await page.close();
      })
      // eslint-disable-next-line consistent-return
      .catch(async () => {
        newLogger.warn('successful login element was not found');
        const emailError = await page.evaluate(() => {
          const e = document.querySelector('div[error-for=username]');
          if (!e) {
            return false;
          }
          const style = window.getComputedStyle(e);
          return (
            style &&
            style.display !== 'none' &&
            style.visibility !== 'hidden' &&
            style.opacity !== '0'
          );
        });

        const passwordError = await page.evaluate(() => {
          const e = document.querySelector('div[error-for=password]');
          if (!e) {
            return false;
          }
          const style = window.getComputedStyle(e);
          return (
            style &&
            style.display !== 'none' &&
            style.visibility !== 'hidden' &&
            style.opacity !== '0'
          );
        });

        if (emailError) {
          newLogger.info('wrong username element found');
          return Promise.reject(
            new Error(
              `linkedin: invalid username: ${process.env.LINKEDIN_EMAIL}`,
            ),
          );
        }

        if (passwordError) {
          newLogger.info('wrong password element found');
          return Promise.reject(new Error('linkedin: invalid password'));
        }
      })
  );
};

export default login;
