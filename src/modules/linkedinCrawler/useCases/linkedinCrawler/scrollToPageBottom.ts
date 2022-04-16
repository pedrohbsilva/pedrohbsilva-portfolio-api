import { Page } from 'puppeteer';
import logger from './logger';

const scrollToPageBottom = async (page: Page): Promise<void> => {
  const MAX_TIMES_TO_SCROLL = 25;
  const TIMEOUT_BETWEEN_SCROLLS = 22500;
  const PAGE_BOTTOM_SELECTOR_STRING = '#expanded-footer';
  const array = Array.from(Array(MAX_TIMES_TO_SCROLL).keys());

  await Promise.all(
    array.map(async (_, index) => {
      await page.evaluate(() => window.scrollBy(0, window.innerHeight));

      await page
        .waitForSelector(PAGE_BOTTOM_SELECTOR_STRING, {
          visible: true,
          timeout: TIMEOUT_BETWEEN_SCROLLS,
        })
        .catch(() => {
          logger(__filename).info(`scrolling to page bottom (${index + 1})`);
        });
    }),
  );
};

export default scrollToPageBottom;
