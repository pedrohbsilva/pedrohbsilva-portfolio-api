import { Page } from 'puppeteer';
import agents from './agents';
import { OpenPageProps } from './interface';

const openPage = async ({ browser, url }: OpenPageProps): Promise<Page> => {
  const page = await browser.newPage();

  await page.setUserAgent(agents[Math.floor(Math.random() * agents.length)]);
  await page.setExtraHTTPHeaders({
    'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
  });
  await page.setViewport({
    width: 1920,
    height: 1080,
  });

  await page.goto(url);

  return page;
};

export default openPage;
