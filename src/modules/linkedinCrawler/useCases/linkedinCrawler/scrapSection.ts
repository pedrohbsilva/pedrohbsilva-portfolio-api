/* eslint-disable dot-notation */
/* eslint-disable no-use-before-define */
import { ElementHandle, Page } from 'puppeteer';
import { FieldKeyProps, ProfileTemplateProps } from './interface';

// const scrapSelectorFields = (
//   selector: ElementHandle<Element>,
//   section: ProfileTemplateProps,
// ) => async (scrapedObjectPromise, fieldKey: FieldKeyProps) => {
//   const scrapedObject = await scrapedObjectPromise;
//   const field = section.fields.name;

//   // currently field can be a selector string, or an object containing a selector field
//   const fieldSelectorString = (await field.selector) ? field.selector : field;

//   const isFieldPresent = await selector.$(fieldSelectorString);

//   if (!isFieldPresent) {
//     return scrapedObject;
//   }

//   if (field.isMultipleFields) {
//     if (field.attribute === 'href') {
//       scrapedObject[fieldKey] = await selector.$$eval(
//         fieldSelectorString,
//         elems =>
//           elems.map(elem =>
//             elem.href ? elem.href.trim() : elem.innerHTML.trim(),
//           ),
//       );
//     } else if (field.attribute === 'src') {
//       scrapedObject[fieldKey] = await selector.$$eval(
//         fieldSelectorString,
//         elems =>
//           elems.map(elem =>
//             elem.src ? elem.src.trim() : elem.innerHTML.trim(),
//           ),
//       );
//     } else {
//       scrapedObject[fieldKey] = await selector.$$eval(
//         fieldSelectorString,
//         elems => elems.map(elem => elem.innerText.trim()),
//       );
//     }
//   } else if (field.hasChildrenFields) {
//     const fieldChildrenSelectors = await selector.$$(field.selector);

//     scrapedObject[fieldKey] = await Promise.all(
//       fieldChildrenSelectors.map(s => scrapSelector(s, field)),
//     );
//   } else if (field.attribute && field.attribute === 'href') {
//     scrapedObject[fieldKey] = await selector.$eval(fieldSelectorString, elem =>
//       elem && elem.href ? elem.href.trim() : '',
//     );
//   } else if (field.attribute && field.attribute === 'src') {
//     scrapedObject[fieldKey] = await selector.$eval(fieldSelectorString, elem =>
//       elem && elem.src ? elem.src.trim() : '',
//     );
//   } else {
//     scrapedObject[fieldKey] = await selector.$eval(fieldSelectorString, elem =>
//       elem && elem.innerText ? elem.innerText.trim() : '',
//     );
//   }

//   return scrapedObject;
// };
const scrapSelector = (element: Element, section: ProfileTemplateProps) => {
  const { fields } = section;
  const teste1 = Object.keys(section.fields).map(item => {
    console.log(item);
    return item;
  });
};

const scrapSection = async (
  page: Page,
  section: ProfileTemplateProps,
): Promise<string> => {
  const teste = await page.waitForSelector(section.selector);
  // const scrapedPromises = sectionSelectors.map(selector =>
  //   scrapSelector(selector, section),
  // );
  const element = await page.waitForSelector(section.selector);
  const scrapedPromises = await element?.evaluate(el => el.textContent);
  console.log(scrapedPromises?.trim());
  return 'deu boa';
};

export default scrapSection;
