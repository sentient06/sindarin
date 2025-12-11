import fs from 'node:fs';
import { swadesh } from './build/swadesh.js';
import { silm100 } from './build/silm100.js';

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
        name: 'To be',
        anchor: 'to_be',
        file: 'to_be'
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
        anchor: 'prepositions_comparison',
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
const notesTxt = fs.readFileSync(`./src/notes.txt`, 'utf8');

const pageHtml = fs.readFileSync('page-template.html', 'utf8');

const domain = 'https://sindarin.mariot.uk';
const sitemap = ['index'];

const username = process.env.USERNAME || process.env.USER;
console.log(`The current username is: ${username}`);

// Source - https://stackoverflow.com/a
// Posted by valdeci, modified by community. See post 'Timeline' for change history
// Retrieved 2025-12-09, License - CC BY-SA 4.0
const MD5 = function(d){var r = M(V(Y(X(d),8*d.length)));return r.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}
const result = MD5(unescape(encodeURIComponent(username)));
const runner = '4bad0b8dd3074cd43f641c2ac22a3571'
const isRunner = result === runner;


function buildPage(name, title) {
  sitemap.push(name);
  let pageCode = pageHtml;
  const pageContent = fs.readFileSync(`pages/${name}.html`, 'utf8');
  const pageStyles = `${generalStyle}\n${pagesStyle}`
  pageCode = pageCode
    .replace(`%date%`, bakedDate)
    .replace(`%year%`, bakedYear)
    .replaceAll(`<!--PAGE_NAME-->`, `${title}`)
    .replaceAll(`<!--TITLE-->`, `Neo Sindarin - ${title}`)
    .replace(`<!--PLACEHOLDER-->`, pageContent)
    .replace('/***STYLES***/', pageStyles)
    .replace('/***SCRIPTS***/', darkmodeScript);
  if (isRunner) {
    fs.writeFileSync(`./${name}.html`, pageCode, 'utf8');
    console.log(` → Built page "${name}.html"`);
  }
}

const landingPages = [
  { name: 'Pronouns', file: 'pronouns'},
  { name: 'Copula', file: 'copula'},
  { name: 'Nouns', file: 'nouns'},
  { name: 'Mutations', file: 'mutations'},
  { name: 'Verbs', file: 'verbs'},
  { name: 'Articles', file: 'articles'},
  { name: 'Adjectives', file: 'adjectives'},
  { name: 'Numerals', file: 'numerals'},
  { name: 'Sentence Structure', file: 'sentence_structure' },
  { name: 'Adverbs', file: 'adverbs'},
  { name: 'Negation', file: 'negation'},
  { name: 'Yes and no', file: 'yesno'},
  { name: 'Conjunctions', file: 'conjunctions'},
  { name: 'Prepositions', file: 'prepositions'},
  { name: 'Genitive', file: 'genitive'},
];

const landing = landingPages.map((item) => {
  return `      <li><a href="${item.file}.html">${item.name}</a></li>`;
}).join('\n');

finalHtml = finalHtml
  .replace('/***STYLES***/', styles)
  .replace('/***SCRIPTS***/', `${darkmodeScript}\n${focusScript}`)
  .replace('<!--MENU-->', menu)
  .replace('<!--NOTES-->', notesTxt)
  .replace('<!--TABLE_SWADESH-->', tableSwadesh)
  .replace('<!--TABLE_SILM100-->', tableSilm100)
  .replace('<!--LANDING-->', landing)
  .replace('<!--PLACEHOLDER-->', '');

// console.log(result);

if (result === 'd62e6f5ce43e5cfc4d132a561dfa0d95' || result === '56ea9c664e8c9f1ad611cf8e5f1bb41c') {
  landingPages.forEach((landingPage) => {
    const { name, file } = landingPage;
    buildPage(file, name);
  });

  const sitemapText = sitemap.map((s) => (`${domain}/${s}.html`)).join('\n');
  // fs.writeFileSync('./_sitemap.txt', sitemapText, 'utf8');
  // fs.writeFileSync('./_index.html', finalHtml, 'utf8');
} else {

  landingPages.forEach((landingPage) => {
    const { name, file } = landingPage;
    buildPage(file, name);
  });

  const sitemapText = sitemap.map((s) => (`${domain}/${s}.html`)).join('\n');

  fs.writeFileSync('./sitemap.txt', sitemapText, 'utf8');
  console.log(' → Built "sitemap.txt"');

  fs.writeFileSync('./index.html', finalHtml, 'utf8');
  console.log(' → Built "index.html"');

  console.log('- Deleting source files...')
  fs.unlink('index-template.html', (err) => {
    if (err) throw err;
    console.log('index-template.html was deleted');
  });
  fs.unlink('page-template.html', (err) => {
    if (err) throw err;
    console.log('page-template.html was deleted');
  });
  fs.unlink('package.json', (err) => {
    if (err) throw err;
    console.log('package.json was deleted');
  });
  fs.unlink('package-lock.json', (err) => {
    if (err) throw err;
    console.log('package-lock.json was deleted');
  });
  fs.rmSync('src', { recursive: true, force: true });
  fs.rmSync('pages', { recursive: true, force: true });
  fs.rmSync('scripts', { recursive: true, force: true });
  fs.rmSync('styles', { recursive: true, force: true });
  fs.rmSync('build', { recursive: true, force: true });
}
