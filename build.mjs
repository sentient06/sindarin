import fs from 'node:fs';
import { swadesh } from './swadesh.js';
import { silm100 } from './silm100.js';

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderTableRows(list, ignoreIndex = false) {

  const rows = [];

  list.forEach((word, idx) => {
    const { term, sindarin } = word;
    const notes = [];
    const gaps = 3 - sindarin.length;
    const id = word.hasOwnProperty('id') ? word.id : idx + 1;
    const tds = [];

    if (ignoreIndex) {
      tds.push(`<td>${term}</td>`);
    } else {
      tds.push(`<td>${id}</td>`);
      tds.push(`      <td>${term}</td>`);
    }
    
    sindarin.forEach(sin => {
      let inner = '';

      if (sin.hasOwnProperty('url')) {
        inner = `<a href="${sin.url}" target="_blank">${sin.term}</a>`;
      } else {
        inner = sin.term;
      }
      tds.push(`      <td>${inner}</td>`);

      if (sin.hasOwnProperty('comment')) {
        notes.push(sin.comment);
      }
    });

    for (var i = 0; i < gaps; i++) {
      tds.push(`      <td></td>`);
    }

    if (word.hasOwnProperty('comment')) {
      tds.push(word.comment);
    }
    
    tds.push(`      <td>${notes.join("; ")}</td>`);

    const tr = `    <tr>
      ${tds.join('\n')}
    </tr>`;

    rows.push(tr);
  });

  return rows.join('\n');
}

let numberSection = 0;
let numberTopic = 0;

function nextSection() {
  numberSection++;
  numberTopic = 1;
  return `${numberSection}.`;
}

function nextTopic() {
  const lastUsed = `${numberSection}.${numberTopic}`;
  numberTopic++;
  return lastUsed;
}

function formatTopic(source) {
  const headingNumber = nextTopic();
  return source.replace('%section%', headingNumber);
}

const template = fs.readFileSync('index-template.html', 'utf8');

const tableSwadesh = renderTableRows(swadesh);
const tableSilm100 = renderTableRows(silm100, true);

const fileNames = [
  { file: 'intro', pass: true },
  { section: 'Fundamentals' },
  { file: 'pronouns' },
  { file: 'copula' },
  { file: 'nouns' },
];

let finalHtml = template;

fileNames.forEach((fileObj) => {
  const { section, file: fileName, pass } = fileObj;
  let formatted;

  if (section) {
    const currentSectionNumber = nextSection();
    formatted = `
<h1>
  ${currentSectionNumber} ${section}
</h1>
<!--PLACEHOLDER-->
  `
  } else {
    const sectionHtml = fs.readFileSync(`./src/${fileName}.html`, 'utf8');

    if (!pass) {
      formatted = formatTopic(sectionHtml);
    } else {
      formatted = sectionHtml;
    }
  }

  finalHtml = finalHtml.replace(`<!--PLACEHOLDER-->`, formatted);
});

finalHtml = finalHtml
  .replace('<!--TABLE_SWADESH-->', tableSwadesh)
  .replace('<!--TABLE_SILM100-->', tableSilm100);

fs.writeFileSync('index.html', finalHtml, 'utf8');

console.log('Built index.html');
