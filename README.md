# CSV Sales Data Processing 
 
This project demonstrates three different approaches to generate and process a 10,000-line 
CSV file of sales data using **Buffer**, **Stream**, and **Bun** runtime. The goal is to compute 
total revenue per country and output a summary CSV. 
 
## Features 
 
- Generate a synthetic sales CSV (`*.csv`) with 10,000 rows of country, product, quantity, 
and price. 
- Read and aggregate total revenue per country using: 
  - Buffered file read (`fs.readFileSync`) 
  - Streaming with `readline` and `fs.createReadStream` 
  - Bun's high-performance file API (`Bun.file`) 
- Write a summary CSV (`*.csv`) with total revenue per country. 
- Measure and compare execution time for each read approach. 
 
## File Structure 
. 
├── generate-sales-buffer.mjs # Generate CSV using Buffer 
├── generate-sales-stream.mjs # Generate CSV using Stream 
├── generate-sales-bun.mjs # Generate CSV using Bun 
├── summary-buffer.mjs # Aggregate and write summary using Buffer 
├── summary-stream.mjs # Aggregate and write summary using Stream 
├── summary-bun.mjs # Aggregate and write summary using Bun 
├── sales.csv # Generated sales data (created by scripts) 
├── summary.csv # Output summary (created by scripts) 
└── README.md 
 
text 
 
## Prerequisites 
 
- **Node.js** (v14 or later) for buffer and stream scripts. 
- **Bun** (latest version) for Bun scripts. 
- No external npm packages required; all scripts use built-in modules. 
 
## Getting Started 
 
1. Clone the repository or download the files. 
2. Ensure Node.js and/or Bun are installed. 
3. Run the generation scripts to create `*.csv`. 
 
### Generate Sales Data 
 
Choose one of the following commands: 
 
```bash 
# Using Buffer (writeFileSync) 
node generate-sales-buffer.mjs 
 
# Using Stream (createWriteStream) 
node generate-sales-stream.mjs 
 
# Using Bun (Bun.write) 
bun generate-sales-bun.mjs 
All three will create sales.csv with 10,000 rows and a header country,product,quantity,price. 
 
Aggregate and Create Summary 
After sales.csv exists, run one of the summary scripts: 
 
bash 
# Using Buffer (readFileSync) 
node summary-buffer.mjs 
 
# Using Stream (createReadStream + readline) 
node summary-stream.mjs 
 
# Using Bun (Bun.file) 
bun summary-bun.mjs 
Each script reads sales.csv, computes total revenue per country (quantity × price), and writes 
summary.csv with columns country,total_revenue. 
 
Performance Comparison 
Approach Memory Usage Speed Use Case 
Buffer High (loads entire file into memory) Fast for small files Files < 100 MB 
Stream Low (processes line-by-line) Slightly slower overhead Very large files or continuous 
data 
Bun High (reads entire file at once) Fastest (optimized I/O) When Bun is 
available; modern projects 
Measured on a typical development machine with a ~200 KB CSV; for very large files, Stream is 
the most scalable. 
 
Script Details 
Generation Scripts 
buffer: Builds all rows in an array, joins them into a single string, converts to Buffer, then uses 
fs.writeFileSync. 
 
stream: Uses fs.createWriteStream and writes each row individually, keeping memory low. 
 
bun: Builds the CSV as a string, then calls await Bun.write() to write it efficiently. 
 
Aggregation Scripts 
buffer: Reads entire file with fs.readFileSync, splits into lines, and iterates. 
 
stream: Uses fs.createReadStream and readline to process line-by-line. 
 
bun: Uses Bun.file().text() to load file as string, then processes similar to buffer. 
 
Results Example 
summary.csv 
 
text 
country,total_revenue 
NG,123,456.78 
GH,234,567.89 
KE,345,678.90 
ZA,456,789.01 
MA,567,890.12 


 
