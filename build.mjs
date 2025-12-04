import fs from 'node:fs';
// import { swadesh } from './swadesh.js';
// import { silm100 } from './silm100.js';

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderTableRows(words) {
  return words
    .map((entry, idx) => {
      // adjust these names to match your actual data shape
      const { term, sindarin } = entry;

      return `
        <span>
        TEST ${idx}
        </span>`;
    })
    .join('\n');
}

const template = fs.readFileSync('template.html', 'utf8');

const tableAHtml = renderTableRows(['a', 'b', 'c']);

const finalHtml = template
  .replace('<!--TABLE_A-->', tableAHtml);

fs.writeFileSync('index2.html', finalHtml, 'utf8');

console.log('Built index2.html');
