import { createReadStream } from 'node:fs'; 
import { createInterface } from 'node:readline'; 
import { once } from 'node:events'; 
 
const start = performance.now(); 

const formatted = new Intl.NumberFormat(
    'en-US', {
        style: 'currency',
        currency: 'NGN',
    }
);
 
const inter = createInterface({ 
  input: createReadStream('sales-with-stream.csv', { encoding: 'utf8' }), 
  crlfDelay: Infinity, 
}); 
 
let totalRevenue = 0; 
let isHeader = true; 
 
inter.on('line', (line) => { 
  if (isHeader) { 
    isHeader = false;
    return; 
  } 
  const [country, product, quantity, price] = line.split(','); 
  totalRevenue += parseFloat(quantity) * parseFloat(price); 
}); 
 
await once(inter, 'close'); 
const end = performance.now(); 
 
console.log(`Total Revenue: ${formatted.format(totalRevenue)}`); 
console.log(`Time taken: ${(end - start).toFixed(2)} ms`); 
console.log('Approach B (streamed read) completed.'); 
