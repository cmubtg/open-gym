import fastcsv from 'fast-csv';
import fs from 'fs';

const CSV_FILE_PATH = 'data/mongodb_data.csv';

const writeToCSV = async (data) => {
  const writeStream = fs.createWriteStream(CSV_FILE_PATH, { flags: 'a' });

  const csvStream = fastcsv
      .format({ writeHeaders: false })
      .transform((doc) => ({
        id: doc.id,
        time: doc.time.toISOString(),
      }));

  csvStream.pipe(writeStream);

  data.forEach((doc) => csvStream.write(doc));
  csvStream.end();

  fs.appendFileSync(CSV_FILE_PATH, '\n');
};

export default writeToCSV;
