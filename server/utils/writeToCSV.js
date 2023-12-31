const fastcsv = require("fast-csv");
const fs = require("fs");

const CSV_FILE_PATH = 'data/mongodb_data.csv';

const writeToCSV = async (data) => {
  const writeStream = fs.createWriteStream(CSV_FILE_PATH, { flags: 'a' });

  const csvStream = fastcsv
    .format({ writeHeaders: false })
    .transform((doc) => ({
      id: doc.id,
      time: doc.time.toISOString(),
    }));

  csvStream.pipe(writeStream).on('end', () => process.exit());;

  data.forEach(doc => csvStream.write(doc));
  csvStream.end();

  fs.appendFileSync(CSV_FILE_PATH, '\n');
}

module.exports = { writeToCSV }
