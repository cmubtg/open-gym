import cron from 'node-cron';
import express from 'express';
import mongoose from 'mongoose';
import OpenGymRoutes from './routes/routes';
import db from './models/database/database';
import { MONGO_URI, PORT } from './utils/constants';

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
mongoose.connect(MONGO_URI)
    .then(() => {
      console.log('Connected to database');

      // weekly clearing database
      cron.schedule('0 0 * * 0', () => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        db.moveAllRecords();
      });

      // listen on port
      app.listen(PORT, () => {
        console.log('Listening on port', PORT);
      });
    })
    .catch((err) => { console.log(err) });
