import { writeFileSync } from 'fs';

const ROWS = 10_000;
const countries = ['NG', 'GH', 'KE', 'ZA', 'MA'];
const rows = ['countries, product, quantity, price'];

for (let i = 0; i < ROWS; i++) {
  const country = countries[i % countries.length];
  const product = `Product-${i}`;
  const quantity = Math.floor(Math.random() * 1000);
  const price = (Math.random() * 100).toFixed(2);
  rows.push(`${country},${product},${quantity},${price}`);
}

writeFileSync('sales-with-buffer.csv', rows.join('\n'));
console.log(`Generated sales-with-buffer.csv with ${ROWS} rows.`);


