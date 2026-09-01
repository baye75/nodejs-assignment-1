const start = performance.now(); 
 
const formatted = new Intl.NumberFormat(
    'en-US', {
        style: 'currency',
        currency: 'NGN',
    }
);

const file = Bun.file('sales-with-buffer.csv'); 
const text = await file.text(); 
 
const lines = text.split('\n').slice(1);
let totalRevenue = 0; 
for (const line of lines) { 
  if (!line) continue; 
  const [country, product, quantity, price] = line.split(','); 
  totalRevenue += parseFloat(quantity) * parseFloat(price); 
} 
 
const end = performance.now(); 
 
console.log(`Total Revenue: ${formatted.format(totalRevenue)}`); 
console.log(`Time taken: ${(end - start).toFixed(2)} ms`); 
console.log('Approach C (Bun read) completed.');
