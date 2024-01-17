import fastcsv from 'fast-csv';
import fs from 'fs';

// Temporary fix
type dataType = (a: any) => any // eslint-disable-line @typescript-eslint/no-explicit-any

const writeToCSV = (
  name: string, 
  data: object[], 
  dataFormatFn: dataType
) => {
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

export default writeToCSV;
