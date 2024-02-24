import express from 'express';
import mongoose from 'mongoose';
import OpenGymRoutes from './routes/routes';
import config from './config';
import { initJobs } from './jobs';

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
      initJobs();

      // listen on port
      app.listen(config.port, () => {
        console.log('Listening on port', config.port);
      });
    })
    .catch((err) => {
      console.log(err);
    });
