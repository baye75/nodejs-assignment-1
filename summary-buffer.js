import { readFileSync, writeFileSync } from 'node:fs'; 
 

const data = readFileSync('sales-with-buffer.csv', 'utf8'); 
 

const lines = data.split('\n').slice(1); 
 
 
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

for (const line of lines) { 
  if (!line.trim()) continue;
 
  const [country, , quantity, price] = line.split(','); 
  const revenue = parseFloat(quantity) * parseFloat(price); 
 
  if (totals[country] !== undefined) { 
    totals[country] += revenue; 
  } 
} 
 

let csv = 'country,total_revenue\n'; 
for (const [country, total] of Object.entries(totals)) { 
  csv += `${country},${formatted.format(total)}\n`; 
} 
 

writeFileSync('summary-buffer.csv', csv, 'utf8'); 
 
console.log('Summary written to summary-buffer.csv'); 
