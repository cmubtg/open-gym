import fastcsv from 'fast-csv';
import fs from 'fs';

const writeToCSV = async (fileName, data, dataFormat) => {
  const writeStream = fs.createWriteStream(fileName, { flags: 'a' });

  const csvStream = fastcsv
      .format({ writeHeaders: false })
      .transform(dataFormat);

  csvStream.pipe(writeStream);

  data.forEach((doc) => csvStream.write(doc));
  csvStream.end();

  fs.appendFileSync(fileName, '\n');
};

export default writeToCSV;
