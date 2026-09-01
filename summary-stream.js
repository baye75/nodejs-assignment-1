// import { createWriteStream } from 'node:fs';

// const totals = {
//   NG: 0,
//   GH: 0,
//   KE: 0,
//   ZA: 0,
//   MA: 0,
// };

// // .., parse and accumulate totals for each country

// const out = createWriteStream('summary.csv');
// out.write('country,total_revenue\n');
// for (const [country, total] of Object.entries(totals)) {
//   out.write(`${country},${total.toFixed(2)}\n`);
// }
// out.end();

// console.log('Summary written to summary.csv');


import { createReadStream, createWriteStream } from 'node:fs'; 
import { createInterface } from 'node:readline'; 
import { once } from 'node:events'; 
 

const totals = { 
  NG: 0, 
  GH: 0, 
  KE: 0, 
  ZA: 0, 
  MA: 0, 
}; 
 
const formatted = new Intl.NumberFormat(
    'en-US', {
        style: 'currency',
        currency: 'NGN',
    }
);


const readStream = createReadStream('sales-with-stream.csv', { encoding: 'utf8' }); 
 

const rl = createInterface({ 
  input: readStream, 
  crlfDelay: Infinity, 
}); 
 

let isHeader = true; 
rl.on('line', (line) => { 
  if (isHeader) { 
    isHeader = false;
    return; 
  } 
  if (!line.trim()) return; 
 
  const [country, , quantity, price] = line.split(','); 
  const revenue = parseFloat(quantity) * parseFloat(price); 
 
  if (totals[country] !== undefined) { 
    totals[country] += revenue; 
  } 
}); 
 

await once(rl, 'close'); 
 

const out = createWriteStream('summary-stream.csv'); 
 

out.write('country,total_revenue\n'); 
 

for (const [country, total] of Object.entries(totals)) { 
  out.write(`${country},${formatted.format(total)}\n`); 
} 
 

out.end(); 
 
console.log('Summary written to summary-stream.csv'); 
