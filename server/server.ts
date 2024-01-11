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
mongoose.connect(MONGO_URI) // eslint-disable-line no-undef
    .then(() => {
      console.log('Connected to database');

      // weekly clearing database
      cron.schedule('0 0 * * 0', async () => {
        db.moveAllRecords();
      });

      // listen on port
      app.listen(PORT, () => { // eslint-disable-line no-undef
        // eslint-disable-next-line no-undef
        console.log('Listening on port', PORT);
      });
    })
    .catch((err) => console.log(err));
