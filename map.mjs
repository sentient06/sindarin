import fs from 'node:fs';

const path = './pages';

fs.readdir(path, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
  } else {
    // console.log(JSON.stringify(files));
    let fileTimes = '';
    files.forEach((file) => {
	    const stats = fs.statSync(`pages/${file}`);
	    const _date = stats.mtime.toISOString().slice(0, 10);
	    fileTimes += `  { file: "${file}", lastUpdate: "${_date}" },\n`;
    });

    const fileDateStr = `export const fileDates = [\n${fileTimes}];`;
    fs.writeFileSync(`./build/fileDates.js`, fileDateStr, 'utf8');
  }
});
