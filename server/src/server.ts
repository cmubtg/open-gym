import express from 'express';
import cors from 'cors';
import mongoose, { Mongoose } from 'mongoose';
import session from 'express-session';
import OpenGymRoutes from './routes/routes';
import config from './config';
import { initJobs } from './jobs';
import { login } from './controllers/login';

const app = express();

// middleware
app.use(express.json());

app.use(cors(config.corsPolicy));
// Configs and uses express sessions

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use('/api/', OpenGymRoutes);

// attempt to login
app.post('/auth/google', login); // eslint-disable-line @typescript-eslint/no-misused-promises


// connect to database
mongoose.connect(config.databaseURL)
    .then((response: Mongoose) => {
      console.log('Connected to database');
      initJobs();

      app.use(session(config.buildSessionConfig(response)));

      // listen on port
      app.listen(config.port, () => {
        console.log('Listening on port', config.port);
      });
    })
    .catch((err) => {
      console.log(err);
    });
