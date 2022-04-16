import { Page } from 'puppeteer';
import newLogger from '../logger';

const seeMoreButtons = [
  {
    id: 'SHOW_MORE_ABOUT',
    selector: '#line-clamp-show-more-button',
  },
  {
    id: 'SHOW_MORE_EXPERIENCES',
    selector: '#experience-section .pv-profile-section__see-more-inline',
  },
  {
    id: 'SEE_MORE_EXPERIENCES',
    selector: '#experience-section .inline-show-more-text__button',
  },
  {
    id: 'SHOW_MORE_CERTIFICATIONS',
    selector: '#certifications-section .pv-profile-section__see-more-inline',
  },
  {
    id: 'SHOW_MORE_SKILLS',
    selector: '.pv-skills-section__additional-skills',
  },
  {
    id: 'SEE_MORE_RECOMMENDATIONS',
    selector: '.recommendations-inlining #line-clamp-show-more-button',
  },
];

const clickAll = async (page: Page): Promise<void> => {
  const logger = newLogger(__filename);
  await Promise.all(
    seeMoreButtons.map(async (_, index) => {
      const button = seeMoreButtons[index];
      const elems = await page.$$(button.selector);
      await Promise.all(
        elems.map(async (item, elemIndex) => {
          const elem = elems[elemIndex];
          if (elem) {
            await elem
              .click()
              .catch(() =>
                logger.warn(
                  `couldn't click on ${button.selector}, it's probably invisible`,
                ),
              );
          }
        }),
      );
    }),
  );
};

export default clickAll;
