import fs from 'node:fs';
import { swadesh } from './swadesh.js';
import { silm100 } from './silm100.js';

const debug = false;

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
      notes.push(word.comment);
    }
    
    tds.push(`      <td>${notes.join("; ")}</td>`);

    const tr = `    <tr>
      ${tds.join('\n')}
    </tr>`;

    rows.push(tr);
  });

  return rows.join('\n');
}

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
        anchor: 'copula',
        file: 'copula'
      },
      {
        name: 'Basic nouns',
        anchor: 'nouns',
        file: 'nouns'
      },
      {
        name: 'Consonant mutations',
        anchor: 'mutations',
        file: 'mutations'
      },
      {
        name: 'Basic verbs',
        anchor: 'basic_verbs',
        file: 'verbs1'
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
  },
  {
    name: 'Prepositions',
    file: 'intro_prepositions',
    anchor: 'prepositions',
    sections: [
      {
        name: 'Overview',
        anchor: 'prepositions_overview',
        file: 'prep_overview'
      },
      {
        name: 'Prepositions of space',
        anchor: 'prepositions_space',
        file: 'prep_space'
      },
      {
        name: 'Prepositions of time',
        anchor: 'prepositions_time',
        file: 'prep_time'
      },
      {
        name: 'Prepositions of association, means, and possession',
        anchor: 'prepositions_means',
        file: 'prep_means'
      },
      {
        name: 'Prepositions of comparison',
        anchor: 'prepositions_role',
        file: 'prep_role'
      },
      {
        name: 'Prepositions of exclusion and opposition',
        anchor: 'prepositions_opposition',
        file: 'prep_opposition'
      },
    ]
  },
  {
    name: 'Intermediate grammar',
    anchor: 'intermediate',
    sections: [
      {
        name: 'Participle',
        anchor: 'participle',
        file: 'participle',
      },
      {
        name: 'Personal pronoun paradigm',
        anchor: 'pronoun_paradigm',
        file: 'pronouns2',
      },
      {
        name: 'Demonstratives',
        anchor: 'demonstrative_pronouns',
        file: 'demonstratives',
      },
      {
        name: 'Interrogative',
        anchor: 'interrogative',
        file: 'interrogatives',
      },
      {
        name: 'Relative Pronouns',
        anchor: 'relative_pronouns',
        file: 'relatives',
      }
    ]
  },
  {
    name: 'Grammatical Constructions',
    anchor: 'constructions',
    sections: [
      {
        name: 'Genitive',
        anchor: 'genitive',
        file: 'genitive'
      },
      {
        name: 'Possessive',
        anchor: 'possessive',
        file: 'possessive'
      },
      {
        name: 'Imperative',
        anchor: 'imperative',
        file: 'imperative'
      },
      {
        name: 'Passive voice',
        anchor: 'passive',
        file: 'passive'
      },
      {
        name: 'Modal constructions ',
        anchor: 'modal',
        file: 'modal'
      }
    ]
  },
  {
    name: 'Verbal System (advanced)',
    anchor: 'verbal_system',
    sections: [
      {
        name: 'Additional verb classes',
        anchor: 'verb_classes',
        file: 'verb_classes'
      },
      {
        name: 'Past Tense',
        anchor: 'past_tense',
        file: 'verb_past'
      },
      {
        name: 'Future Tense',
        anchor: 'future_tense',
        file: 'verb_future'
      },
      {
        name: 'Other Tenses',
        anchor: 'other_tenses',
        file: 'verb_tenses'
      }
    ]
  },
  {
    name: 'Word formation',
    anchor: 'word_formation',
    sections: [
      {
        name: 'Diminutive',
        anchor: 'diminutive',
        file: 'diminutive'
      },
      {
        name: 'Augmentative',
        anchor: 'augmentative',
        file: 'augmentative'
      }
    ]
  },
  {
    name: 'Vocabulary',
    anchor: 'vocabulary',
    sections: [
      {
        name: 'Word Lists',
        anchor: 'word_lists',
        file: 'word_lists'
      }
    ]
  }
];

let finalHtml = fs.readFileSync('index-template.html', 'utf8');
let menu = '<!--MENU-->';

const protoDate = new Date().toJSON().slice(0,10).split('-');
const bakedYear = protoDate[0];
const bakedDate = protoDate.reverse().join('/');

finalHtml = finalHtml
  .replaceAll(`<!--TITLE-->`, "Neo Sindarin - A Stepwise Grammar")
  .replace(`%date%`, bakedDate)
  .replace(`%year%`, bakedYear);

let i = 0;
skeleton.forEach((item) => {
  const { file, intro, name, anchor, sections } = item;

  console.log('\n- Processing', i+1, file || '--', name || '--', anchor || '--', sections?.length || '--');

  if (name) {
    i++;
    const formatted = `
<h2 id="${anchor}">
  ${i}. ${name}
</h2>
<!--PLACEHOLDER-->
  `
    finalHtml = finalHtml.replace(`<!--PLACEHOLDER-->`, formatted);

    menu = menu.replace('<!--MENU-->', `    <li>\n      <a href="#${anchor}">${i}. ${name}</a>\n      <ul>\n<!--MENU-->\n      </ul>\n    </li>`);
  }

  if (file) {
    const sectionHtml = fs.readFileSync(`./src/${file}.html`, 'utf8');
    if (debug) {
      finalHtml = finalHtml.replace(`<!--PLACEHOLDER-->`, `[${file}.html]<!--PLACEHOLDER-->`);
    }
    finalHtml = finalHtml.replace(`<!--PLACEHOLDER-->`, sectionHtml);
  }

  if (sections) {
    let j = 0;
    sections.forEach((section) => {
      console.log('- - Processing', j+1, section.file, section.anchor, section.name);
      j++;
      let sectionHtml = fs.readFileSync(`./src/${section.file}.html`, 'utf8');
      sectionHtml = sectionHtml.replace('%section%', `${i}.${j}`);
      if (debug) {
        finalHtml = finalHtml.replace(`<!--PLACEHOLDER-->`, `[${section.file}.html]<!--PLACEHOLDER-->`);
      }
      finalHtml = finalHtml.replace(`<!--PLACEHOLDER-->`, sectionHtml);
      menu = menu.replace('<!--MENU-->', `        <li><a href="#${section.anchor}">${i}.${j} ${section.name}</a></li>\n<!--MENU-->`);
    });
    menu = menu.replace('\n<!--MENU-->', '');
    menu = `${menu}\n<!--MENU-->`;
  }
});

menu = menu.replace('\n<!--MENU-->', '');

const generalStyle = fs.readFileSync(`./styles/general.css`, 'utf8');
const indexStyle   = fs.readFileSync(`./styles/index.css`, 'utf8');
const pagesStyle   = fs.readFileSync(`./styles/pages.css`, 'utf8');
const styles = `${generalStyle}\n${indexStyle}`;
const darkmodeScript = fs.readFileSync(`./scripts/darkmode.js`, 'utf8');
const focusScript = ''; //fs.readFileSync(`./scripts/focus.js`, 'utf8');
const notesTxt = fs.readFileSync(`./notes.txt`, 'utf8');

const pageHtml = fs.readFileSync('page-template.html', 'utf8');

function buildPage(name, title) {
  let pageCode = pageHtml;
  const pageContent = fs.readFileSync(`pages/${name}.html`, 'utf8');
  const pageStyles = `${generalStyle}\n${pagesStyle}`
  pageCode = pageCode
    .replace(`%date%`, bakedDate)
    .replace(`%year%`, bakedYear)
    .replaceAll(`<!--TITLE-->`, `Neo Sindarin - ${title}`)
    .replace(`<!--PLACEHOLDER-->`, pageContent)
    .replace('/***STYLES***/', pageStyles)
    .replace('/***SCRIPTS***/', darkmodeScript);
  fs.writeFileSync(`./out/page_${name}.html`, pageCode, 'utf8');
  console.log(`Built page_${name}.html`);
}

const landingPages = [
  { name: 'Pronouns', file: 'pronouns'},
  { name: 'Copula', file: 'copula'},
  { name: 'Nouns', file: 'nouns'},
  { name: 'Mutations', file: 'mutations'},
  { name: 'Verbs', file: 'verbs'},
];

// landingPages.forEach((landingPage) => {
//   const { name, file } = landingPage;
//   buildPage(file, name);
// });

console.log('Built index.html');

finalHtml = finalHtml
  .replace('/***STYLES***/', styles)
  .replace('/***SCRIPTS***/', `${darkmodeScript}\n${focusScript}`)
  .replace('<!--MENU-->', menu)
  .replace('<!--NOTES-->', notesTxt)
  .replace('<!--TABLE_SWADESH-->', tableSwadesh)
  .replace('<!--TABLE_SILM100-->', tableSilm100)
  .replace('<!--PLACEHOLDER-->', '');

fs.writeFileSync('./index.html', finalHtml, 'utf8');

