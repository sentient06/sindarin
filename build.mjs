import fs from 'node:fs';
import { swadesh } from './build/swadesh.js';
import { silm100 } from './build/silm100.js';
import { mutationsA, mutationsB } from './build/mutations.js';

/*

[implied]

*italic*

**bold**

***italic bold***

§soft§

§§nasal§§

§§§mixed§§§

@stop@

@@liquid@@

@@@sibilant@@@

||file||link||

*/


// Source - https://stackoverflow.com/a
// Posted by valdeci, modified by community. See post 'Timeline' for change history
// Retrieved 2025-12-09, License - CC BY-SA 4.0
const MD5 = function(d){var r = M(V(Y(X(d),8*d.length)));return r.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}
const username = process.env.USERNAME || process.env.USER;
const result = MD5(unescape(encodeURIComponent(username)));
const runner = '4bad0b8dd3074cd43f641c2ac22a3571'
const isRunner = result === runner;
console.log(`The current username is: ${username}`);
const softGen = isRunner === false;
const debug = false;

console.log(`Soft generation is ${softGen ? 'true' : 'false'}`);

if (softGen) {
  fs.mkdir('./out', { recursive: true }, (err) => {
    if (err) throw err;
  });
}

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

function renderMutations(mutations) {
  console.log('> renderMutations ------------------------------------------');

  let table = [];
  let columns = [];

  let colLen = [];

  const typeStr = "[object String]";
  const typeArr = "[object Array]";

  // Define lengths of columns:
  mutations.rows.forEach((row, i) => {
    console.log(' - row', i);
    row.forEach((col, j) => {
      let celLength = colLen[j] || 0;

      const rowType = Object.prototype.toString.call(col);

      if (rowType === typeStr) {
        // newRow[j] = col;
        celLength = Math.max(celLength, col.length);
        console.log(' - - col s', typeof col, j, col, celLength);
      } else

      if (rowType === typeArr) {
        let _celLength = 0
        col.reduce((acc, val, idx) => {
          if (val.indexOf('[') > -1 && val.indexOf(']') > -1) {
            _celLength += val.length - 2;
          } else {
            _celLength += val.length;
          }
        });
        _celLength += (col.length - 1) * 2;
        celLength = Math.max(celLength, _celLength);
        console.log(' - - col a', typeof col, j, col, celLength);
      }

      colLen[j] = celLength;
    });
  });

  const padVal = 5;

  // Write lines:
  mutations.rows.forEach((row, i) => {
    table[i] = [];
    const makeBold = i === 0;
    row.forEach((col, j) => {
      const rowType = Object.prototype.toString.call(col);
      const firstItem = j === 0;

      let _value = "";

      if (rowType === typeStr) {
        if (makeBold) {
          const padSize = colLen[j] + padVal - col.length;
          const boldVal = `<b>${col}</b>`;
          _value = boldVal.padEnd(boldVal.length + padSize, ' ');
        } else {
          _value = col.padEnd(colLen[j] + padVal, ' ');
        }

        if (firstItem) {
          _value = _value.padStart(_value.length + 2, ' ');
        }

      } else

      if (rowType === typeArr) {
        let hoverLen = colLen[j] + padVal - col.map(v => v.replace(/\[/, '').replace(/\]/, '')).join(', ').length;
        console.log('~~~~~> a ', colLen[j], padVal, col.map(v => v.replace(/\[/, '').replace(/\]/, '')).join(', '));
        const hoverVal = col.map((mut, l) => {
          let newMut = mut;
          const hoverOrg = j > 1 ? row[1][l] : '';
          const quiet = hoverOrg === newMut ? ' quiet' : '';

          if (mut.indexOf('[') > -1 && mut.indexOf(']') > -1) {
            newMut = mut
              .replace(/\[/g, `<span class="quiet">`)
              .replace(/\]/g, `</span>`);
          }

          console.log('~~~~~> b ', hoverOrg, newMut, quiet, hoverLen);
          return `<span class="c_${l}${quiet}">${newMut}</span>`;
        }).join(', ');
        _value = hoverVal.padEnd(hoverVal.length + hoverLen, ' ');
      }

      table[i][j] = _value;
    });
  });

  let tableStr = table.map(row => row.join('')).map(_r => (`<span class="row">${_r}</span>`)).join('\n');


  console.log('X renderMutations ------------------------------------------');

  return tableStr;
}

const tableSwadesh = renderTableRows(swadesh);
const tableSilm100 = renderTableRows(silm100, true);
const tableMutationsA = renderMutations(mutationsA);
const tableMutationsB = renderMutations(mutationsB);

const skeleton = [
  {
    file: 'intro',
  },
  {
    file: 'fundamentals',
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
        name: 'Nouns',
        anchor: 'nouns',
        file: 'nouns'
      },
      {
        name: 'Consonant mutations',
        anchor: 'mutations',
        file: 'mutations',
        callback: (code) => {
        return code
          .replace('<!--MUTATIONS-A-->', tableMutationsA)
          .replace('<!--MUTATIONS-B-->', tableMutationsB);
        }
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
        name: 'Sentence structure',
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
      // {
      //   name: 'Similar prepositions',
      //   anchor: 'prepositions_similar',
      //   file: 'prep_similar'
      // },
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
      },
      {
        name: 'Comparative',
        anchor: 'comparative',
        file: 'comparative',
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
        name: 'Making compound words',
        anchor: 'compounds',
        file: 'compound-example'
      },
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
    name: 'More',
    anchor: 'more',
    file: 'more'
  },
];

// Index file:

let finalHtml = fs.readFileSync('index-template.html', 'utf8');
let menu = '<!--MENU-->';

const protoDate = new Date().toJSON().slice(0,10).split('-');
const bakedYear = protoDate[0];
const bakedDate = protoDate.reverse().join('/');

finalHtml = finalHtml
  .replaceAll(`<!--TITLE-->`, "Neo Sindarin - A Stepwise Grammar")
  .replace(`%date%`, bakedDate)
  .replace(`%year%`, bakedYear);


function formatShortcuts(str) {
  return str
    .replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
    .replace(/\*\*\*([^\*\n]+)\*\*\*/g, `<b><i>$1</i></b>`)
    .replace(/\*\*([^\*\n]+)\*\*/g, `<b>$1</b>`)
    .replace(/\*([^\*\n]+)\*/g, `<i>$1</i>`)
    .replace(/±([^±\n]+)±/g, `<small>$1</small>`)
    .replace(/§§§([^§\n\s-]+)§([^§\n\s-]+)§§§/g, `<abbr class="mixed" title="$1">$2</abbr>`)
    .replace(/§§§([^§\n]+)§§§/g, `<span class="mixed">$1</span>`)
    .replace(/§§([^§\n\s-]+)§([^§\n\s-]+)§§/g, `<abbr class="nasal" title="$1">$2</abbr>`)
    .replace(/§§([^§\n]+)§§/g, `<span class="nasal">$1</span>`)
    .replace(/§([^§\n\s-]+)§([^§\n\s-]+)§/g, `<abbr class="soft" title="$1">$2</abbr>`)
    .replace(/§([^§\n]+)§/g, `<span class="soft">$1</span>`)
    // .replace(/§(([^§\n]{1})[^§\n]{1})([^§\n]+)§/g, (match, p1, p2, p3, offset, str) => {
    //   const mutated = `${p1}${p3}`;
    //   let unmutated = mutated;
    //   console.log('>>>>', mutated, p1, p2, p3);
    //   if (p2 === 'b') {
    //     unmutated = unmutated.replace('b', 'p');
    //   }
    //   return `<abbr class="soft" title="${unmutated}">${mutated}</abbr>`;
    // })
    .replace(/@@@([^@\n\s-]+)@([^@\n\s-]+)@@@/g, `<abbr class="sibilant" title="$1">$2</abbr>`)
    .replace(/@@@([^@\n]+)@@@/g, `<span class="sibilant">$1</span>`)
    .replace(/@@([^@\n\s-]+)@([^@\n\s-]+)@@/g, `<abbr class="liquid" title="$1">$2</abbr>`)
    .replace(/@@([^@\n]+)@@/g, `<span class="liquid">$1</span>`)
    .replace(/@([^@\n\s-]+)@([^@\n\s-]+)@/g, `<abbr class="stop" title="$1">$2</abbr>`)
    .replace(/@([^@\n]+)@/g, `<span class="stop">$1</span>`)
    .replace(/\|\|([^\|\n]+)\|\|([^\|\n]+)\|\|/g, (match, p1, p2) => {
      let addr = `${p1}.html`;
      if (p1.indexOf('/') > -1) {
        const parts = p1.split('/');
        addr = `${parts[0]}.html${parts[1]}`;
      }
      return `<a href="${addr}" class="inner-link">${p2}</a>`;
    })
    .replace(/(?<=".*)(\[[^\]\n]+\])(?=[^"^\n]+")/g, `<span class="subtle">$1</span>`);
}

let i = 0;
skeleton.forEach((item) => {
  const { file, intro, name, anchor, sections, callback } = item;

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
    let sectionHtml = fs.readFileSync(`./src/${file}.html`, 'utf8');
    if (callback) {
      sectionHtml = callback(sectionHtml);
    }
    sectionHtml = formatShortcuts(sectionHtml);

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
      if (section.hasOwnProperty('callback')) {
        if (section.callback) {
          sectionHtml = section.callback(sectionHtml);
        }
      }
      sectionHtml = formatShortcuts(sectionHtml.replace('%section%', `${i}.${j}`));

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

let generalStyle = '';

const generalStyles = ['base', 'sticky', 'toggler', 'syntax', 'mutations', 'examples'];
generalStyles.forEach((gs) => {
  const nextCss = fs.readFileSync(`./styles/gen_${gs}.css`, 'utf8');
  generalStyle += '\n';
  generalStyle += nextCss;
});

const nextCss = fs.readFileSync(`./styles/general.css`, 'utf8');
generalStyle += '\n';
generalStyle += nextCss;



const indexStyle   = fs.readFileSync(`./styles/index.css`, 'utf8');
const pagesStyle   = fs.readFileSync(`./styles/pages.css`, 'utf8');
const styles = `  <style>\n${generalStyle}\n${indexStyle}\n  </style>`;

const darkmodeScript = fs.readFileSync(`./scripts/darkmode.js`, 'utf8');
const stickyScript = fs.readFileSync(`./scripts/sticky.js`, 'utf8');
const focusScript = ''; //fs.readFileSync(`./scripts/focus.js`, 'utf8');
const notesTxt = fs.readFileSync(`./src/notes.txt`, 'utf8');

const pageHtmlTemplate = fs.readFileSync('page-template.html', 'utf8');

const domain = 'https://sindarin.elvish.nz';
const sitemap = [''];


function processSection(extantHtml, name, anchor, file, idx) {
  let finalHtml = extantHtml;
  let sectionHtml = fs.readFileSync(`./pages/${file}.html`, 'utf8');
  sectionHtml = sectionHtml.replace('%section%', `${idx + 1}.`);
  sectionHtml = formatShortcuts(sectionHtml);
  finalHtml = `${finalHtml}\n${sectionHtml}`;
  return finalHtml;
}

function buildPage(pageObj) {
  const { name, in: _in, out, skip, callback, sections, css, unmap } = pageObj;
  // console.log(` ~> name: ${name}, in: ${_in}, out: ${out}, skip: ${skip ? 'true' : 'false'}, callback: ${callback ? 'true' : 'false'}, sections: ${sections?.length}`);
  let fileInput   = _in;
  let fileOutput  = out || _in;
  let pageCode    = pageHtmlTemplate;
  let pageHtml    = fileInput ? fs.readFileSync(`pages/${fileInput}.html`, 'utf8') : '';
  let pageStyles  = `${generalStyle}\n${pagesStyle}`;
  let pageScripts = `${darkmodeScript}`;

  if (css) {
    css.forEach((cssFile) => {
      const cssFileCode = fs.readFileSync(`styles/${cssFile}.css`, 'utf8');
      pageStyles += `\n${cssFileCode}`;
    });
  }
  
  if (Boolean(unmap) === false) {
    sitemap.push(fileOutput);
  }

  // Setup basic values:
  pageCode = pageCode
    .replace(`%date%`, bakedDate)
    .replace(`%year%`, bakedYear)
    .replaceAll(`<!--PAGE_NAME-->`, `${name}`)
    .replaceAll(`<!--CANONICAL-->`, `${fileOutput}.html`)
    .replaceAll(`<!--TITLE-->`, `Neo Sindarin - ${name}`);
    
  // Setup CSS and JS:
  pageCode = pageCode
    .replace('<!--STYLES-->', `  <style>\n${pageStyles}\n  </style>`)
    .replace('/// SCRIPTS ///', darkmodeScript);

  // Setup HTML:
  if (sections) {
    sections.forEach((section, idx) => {
      const { name, anchor, file } = section;
      pageHtml = processSection(pageHtml, name, anchor, file, idx);
    });
  }
  if (callback) {
    pageHtml = callback(pageHtml);
  }
  pageHtml = formatShortcuts(pageHtml);
  pageCode = pageCode
    .replace(`<!--PLACEHOLDER-->`, pageHtml)

  if (softGen) {
    fs.writeFileSync(`./out/${fileOutput}.html`, pageCode, 'utf8');
  } else {
    fs.writeFileSync(`./${fileOutput}.html`, pageCode, 'utf8');
  }
  console.log(` → Built page "${fileOutput}.html"`);
}

const landingPages = [
  {
    name: 'Pronouns',
    in: 'pronouns' 
  },
  // {
  //   name: 'Copula',
  //   in: 'copula' 
  // },
  {
    name: 'Nouns',
    in: 'nouns' 
  },
  {
    name: 'Mutations',
    in: 'mutations_old',
    skip: true
  },
  {
    name: 'Mutations table',
    in: 'mutations',
    css: ['div_tables', 'mutations_table'],
    skip: true
  },
  {
    name: 'Verbs',
    in: 'verbs' 
  },
  {
    name: 'Articles',
    in: 'articles' 
  },
  {
    name: 'Adjectives',
    in: 'adjectives' 
  },
  {
    name: 'Numerals',
    in: 'numerals' 
  },
  {
    name: 'Sentence Structure',
    in: 'sentence_structure'  
  },
  {
    name: 'Adverbs',
    in: 'adverbs' 
  },
  {
    name: 'Negation',
    in: 'negation' 
  },
  {
    name: 'Yes and no',
    in: 'yesno' 
  },
  {
    name: 'Conjunctions',
    in: 'conjunctions' 
  },
  // {
  //   name: 'Prepositions',
  //   in: 'prepositions' 
  // },
  {
    name: 'Genitive',
    in: 'genitive' 
  },
  {
    name: 'Word lists',
    in: 'word_lists',
    skip: true,
    callback: (code) => {
    return code
      .replace('<!--TABLE_SWADESH-->', tableSwadesh)
      .replace('<!--TABLE_SILM100-->', tableSilm100);
    }
  },
  {
    name: 'Time words and expressions',
    in: 'time',
    skip: true
  },
  {
    name: 'Copula',
    in: 'copula',
    skip: true
  },
  {
    name: 'Prepositions',
    skip: true,
    out: 'prepositions',
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
      {
        name: 'Similar prepositions',
        anchor: 'prepositions_similar',
        file: 'prep_similar'
      },
    ],
  },
  {
    name: 'Tengwar',
    in: 'tengwar',
    css: ['tengwar', 'div_tables', 'tengwar_table'],
    skip: true
  },
  {
    name: 'Example of a translation',
    in: 'translation',
    css: ['tengwar'],
    skip: true
  },
];

const landing = landingPages.filter((item) => {
  if (item.hasOwnProperty('skip')) {
    if (item.skip === true) {
      return false;
    }
  }
  return true;
}).map((item) => {
  const fileName = item?.out || item?.in || '404';
  return `      <li><a href="${fileName}.html">${item.name}</a></li>`;
}).join('\n');

finalHtml = finalHtml
  .replace('<!--PLACEHOLDER-->', '')
  .replace('<!--MENU-->', menu)
  .replace('<!--NOTES-->', notesTxt)
  .replace('<!--LANDING-->', landing)
  .replace('<!--STYLES-->', styles)
  .replace('/// SCRIPTS ///', `${darkmodeScript}\n${focusScript}\n${stickyScript}`)
  ;

// if (result === 'd62e6f5ce43e5cfc4d132a561dfa0d95' || result === '56ea9c664e8c9f1ad611cf8e5f1bb41c') {
if (softGen) {
  landingPages.forEach((landingPage) => {
    buildPage(landingPage);
  });

  const sitemapText = sitemap.map((s) => (`${domain}/${s ? `${s}.html` : ''}`)).join('\n');
  fs.writeFileSync('./out/sitemap.txt', sitemapText, 'utf8');
  fs.writeFileSync('./out/index.html', finalHtml, 'utf8');
  
  fs.cp('./img', './out/img', { recursive: true }, (err) => err ? console.error(err) : null);
  fs.cp('./tengwar', './out/tengwar', { recursive: true }, (err) => err ? console.error(err) : null);
} else {

  landingPages.forEach((landingPage) => {
    buildPage(landingPage);
  });

  const sitemapText = sitemap.map((s) => (`${domain}/${s ? `${s}.html` : ''}`)).join('\n');

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
