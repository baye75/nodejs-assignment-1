 
const ROWS = 10_000; 
const countries = ['NG', 'GH', 'KE', 'ZA', 'MA']; 
 

const rows = ['country,product,quantity,price']; 
 
for (let i = 0; i < ROWS; i++) { 
  const country = countries[i % countries.length]; 
  const product = `product-${i}`; 
  const quantity = Math.floor(Math.random() * 1000); 
  const price = (Math.random() * 100).toFixed(2); 
  rows.push(`${country},${product},${quantity},${price}`); 
} 
 

const csvString = rows.join('\n') + '\n';  

const buffer = Buffer.from(csvString, 'utf8'); 
 

await Bun.write('sales-with-bun.csv', buffer); 
 

console.log(`Generated ${ROWS} rows (${buffer.length} bytes) into sales-with-bun.csv`); 
