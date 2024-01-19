import dotenv from 'dotenv';
dotenv.config(); // load env variables

export default {
  port: parseInt(process.env.PORT ?? '', 10),
  databaseURL: process.env.MONGO_URI ?? '',
};
