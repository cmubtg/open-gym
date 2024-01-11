import fastcsv from 'fast-csv';
import fs from 'fs';

export default async function writeToCSV(
  name: string, 
  data: Array<Object>, 
  dataFormatFn: (a: any) => Object
) {
  const fileName = 'data/' + name + '_data.csv'
  const writeStream = fs.createWriteStream(fileName, { flags: 'a' });

  const csvStream = fastcsv
      .format({ writeHeaders: false })
      .transform(dataFormatFn);

  csvStream.pipe(writeStream);

  data.forEach((doc) => csvStream.write(doc));
  csvStream.end();

  fs.appendFileSync(fileName, '\n');
};
