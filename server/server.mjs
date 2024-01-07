/* eslint-disable no-undef */
import dotenv from 'dotenv';
dotenv.config(); // load env variables

import cron from 'node-cron';
import express from 'express';
import mongoose from 'mongoose';
import OpenGymRoutes from './routes/routes.mjs';
import * as db from './models/database.mjs';

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
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('Connected to database');

      // weekly clearing database
      cron.schedule('0 0 * * 0', async () => {
        db.moveAllData();
      });

      // listen on port
      app.listen(process.env.PORT, () => {
        console.log('Listening on port', process.env.PORT);
      });
    })
    .catch((err) => console.log(err));
