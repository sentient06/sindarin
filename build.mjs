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

// let numberSection = 0;
// let numberTopic = 0;

// function nextSection() {
//   numberSection++;
//   numberTopic = 1;
//   return `${numberSection}.`;
// }

// function nextTopic() {
//   const lastUsed = `${numberSection}.${numberTopic}`;
//   numberTopic++;
//   return lastUsed;
// }

// function formatTopic(source) {
//   const headingNumber = nextTopic();
//   return source.replace('%section%', headingNumber);
// }

// const template = fs.readFileSync('index-template.html', 'utf8');

const tableSwadesh = renderTableRows(swadesh);
const tableSilm100 = renderTableRows(silm100, true);

const skeleton = [
  {
    file: 'intro',
  },
  {
    name: 'Fundamentals',
    anchor: 'fundamentals',
    sections: [
      {
        name: 'Pronouns',
        anchor: 'pronouns',
        file: 'pronouns'
      },
      {
        name: 'Copular system',
        anchor: 'copular',
        file: 'copula'
      },
      {
        name: 'Basic nouns',
        anchor: 'basic_nouns',
        file: 'nouns'
      },
      {
        name: 'Basic verbs',
        anchor: 'basic_verbs',
        file: 'verbs1'
      },
      {
        name: 'Consonant mutations',
        anchor: 'mutations',
        file: 'mutations'
      },
    ]
  },
  {
    name: 'Articles, Adjectives, and Basic Syntax',
    anchor: 'basic',
    sections: [
      {
        name: 'Articles',
        anchor: 'articles',
        file: 'articles'
      },
      {
        name: 'Adjectives',
        anchor: 'adjectives',
        file: 'adjectives'
      },
      {
        name: 'Numerals',
        anchor: 'numerals',
        file: 'numerals'
      },
      {
        name: 'Sentence Structure',
        anchor: 'sentence_structure',
        file: 'sentence'
      },
      {
        name: 'Adverbs',
        anchor: 'adverbs',
        file: 'adverbs'
      },
      {
        name: 'Negation',
        anchor: 'negation',
        file: 'negation'
      },
      {
        name: 'Yes and No',
        anchor: 'yes_no',
        file: 'yesno'
      },
      {
        name: 'Conjunctions',
        anchor: 'conjunctions',
        file: 'conjunctions'
      },
    ]
  }
];

let finalHtml = fs.readFileSync('index-template.html', 'utf8');
let menu = '<!--MENU-->';

let i = 0;
skeleton.forEach((item) => {
  const { file, name, anchor, sections } = item;

  console.log('- Processing', file, name, anchor, sections?.length);

  if (!!file && !!name) {
    throw `Can't have file and name at the same time! ${file} - ${name}`;
  }

  if (file) {
    const sectionHtml = fs.readFileSync(`./src/${file}.html`, 'utf8');
    finalHtml = finalHtml.replace(`<!--PLACEHOLDER-->`, sectionHtml);
  } else

  if (name) {
    i++;
    const formatted = `
<h1>
  ${i}. ${name}
</h1>
<!--PLACEHOLDER-->
  `
    finalHtml = finalHtml.replace(`<!--PLACEHOLDER-->`, formatted);

    menu = menu.replace('<!--MENU-->', `    <li>\n      <a href="#${anchor}">${i}. ${name}</a>\n      <ul>\n<!--MENU-->\n      </ul>\n    </li>`);
  }

  if (sections) {
    let j = 0;
    sections.forEach((section) => {
      console.log('- - Processing', section.file, section.anchor, section.name);
      j++;
      let sectionHtml = fs.readFileSync(`./src/${section.file}.html`, 'utf8');
      sectionHtml = sectionHtml.replace('%section%', `${i}.${j}`);
      finalHtml = finalHtml.replace(`<!--PLACEHOLDER-->`, sectionHtml);
      menu = menu.replace('<!--MENU-->', `        <li><a href="#${section.anchor}">${i}.${j} ${section.name}</a></li>\n<!--MENU-->`);
    });
    menu = menu.replace('\n<!--MENU-->', '');
    menu = `${menu}\n<!--MENU-->`;
  }
});

menu = menu.replace('\n<!--MENU-->', '');



// const fileNames = [
//   { file: 'intro', pass: true },
//   { section: 'Fundamentals' },
//   { file: 'pronouns' },
//   { file: 'copula' },
//   { file: 'nouns' },
// ];

// let finalHtml = template;

// fileNames.forEach((fileObj) => {
//   const { section, file: fileName, pass } = fileObj;
//   let formatted;

//   if (section) {
//     const currentSectionNumber = nextSection();
//     formatted = `
// <h1>
//   ${currentSectionNumber} ${section}
// </h1>
// <!--PLACEHOLDER-->
//   `
//   } else {
//     const sectionHtml = fs.readFileSync(`./src/${fileName}.html`, 'utf8');

//     if (!pass) {
//       formatted = formatTopic(sectionHtml);
//     } else {
//       formatted = sectionHtml;
//     }
//   }

//   finalHtml = finalHtml.replace(`<!--PLACEHOLDER-->`, formatted);
// });

finalHtml = finalHtml
  .replace('<!--MENU-->', menu)
  .replace('<!--TABLE_SWADESH-->', tableSwadesh)
  .replace('<!--TABLE_SILM100-->', tableSilm100);

fs.writeFileSync('index.html', finalHtml, 'utf8');

console.log('Built index.html');
