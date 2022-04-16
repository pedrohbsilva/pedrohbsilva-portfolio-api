const getSelector = (selector: string): string => {
  return (
    {
      EMAIL_SELECTOR: '#username',
      PASSWORD_SELECTOR: '#password',
      SUBMIT_SELECTOR:
        '#app__container > main > div > div > form > div.login__form_action_container > button',
      LINKEDIN_LOGIN_URL:
        'https://www.linkedin.com/checkpoint/lg/login?trk=hb_signin',
      LINKEDIN_PROFILE_URL: 'https://www.linkedin.com/in/pedro-h-b-da-silva/',
      LINKEDIN_NAME:
        'section.artdeco-card.ember-view.pv-top-card > div.ph5.pb5 > div.mt2.relative > div:nth-child(1) > div:nth-child(1) > h1',
      LINKEDIN_TITLE:
        'section.artdeco-card.ember-view.pv-top-card > div.ph5.pb5 > div.mt2.relative > div:nth-child(1) > div.text-body-medium.break-words',
      LINKEDIN_ABOUT:
        'section.artdeco-card.ember-view.break-words.pb3.mt4 > div.display-flex.ph5.pv3 > div > div > div > span:nth-child(1)',
      LINKEDIN_EXPERIENCE:
        'section.artdeco-card.ember-view.break-words.pb3.mt4 > div.pvs-list__outer-container > ul > li:nth-child(4) > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > a > div > span > span:nth-child(1)',
    }[selector] || 'Selector not found'
  );
};

export default getSelector;
