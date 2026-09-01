import { readFileSync } from 'node:fs';

const start = performance.now();
const data = readFileSync('sales-with-buffer.csv', 'utf8');
const end = performance.now();
const lines = data.split('\n').slice(1); // drop the header line
let totalRevenue = 0;

//  what is for of loop:
// The `for...of` loop is a control flow statement in JavaScript that
// allows you to iterate over iterable objects, such as arrays,
// strings, maps, sets, and more. It provides a simpler and more
//  readable way to loop through the elements of an iterable compared
// to traditional `for` loops or `for...in` loops.

for (const line of lines) {
  const [country, product, quantity, price] = line.split(',');
  totalRevenue += parseFloat(quantity) * parseFloat(price);
}

console.log(`Total Revenue: $${totalRevenue.toFixed(2)}`);
console.log(`Time taken: ${(end - start).toFixed(2)} ms`);
console.log('Approach A (buffered read) completed.');
