import cron from 'node-cron';
import express from 'express';
import mongoose from 'mongoose';
import OpenGymRoutes from './routes/routes';
import db from './models/database';
import config from './config';

const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use('/api/', OpenGymRoutes);

// connect to database
mongoose.connect(config.databaseURL)
    .then(() => {
      console.log('Connected to database');

      // weekly clearing database
      cron.schedule('0 0 * * 0', () => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        db.moveAllRecords();
      });

      // listen on port
      app.listen(config.port, () => {
        console.log('Listening on port', config.port);
      });
    })
    .catch((err) => {
      console.log(err);
    });
