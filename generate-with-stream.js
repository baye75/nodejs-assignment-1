import { createWriteStream } from 'fs'; 
 
const ROWS = 10_000; 
const countries = ['NG', 'GH', 'KE', 'ZA', 'MA']; 
 
const writeStream = createWriteStream('sales-with-stream.csv'); 
 
writeStream.write('country,product,quantity,price\n'); 
 
for (let i = 1; i <= ROWS; i++) { 
//   const country = countries[i % countries.length]; 
  const country =countries[Math.floor(Math.random() * countries.length)]
  const product = `product-${i}`; 
  const quantity = Math.floor(Math.random() * 1000); 
  const price = (Math.random() * 100).toFixed(2); 
  const row = `${country},${product},${quantity},${price}\n`; 
  writeStream.write(row); 
} 
 
writeStream.end(() => { 
  console.log(`Finished writing ${ROWS} rows to sales-with-stream.csv`); 
});
