import express from 'express';
import mongoose from 'mongoose';
import OpenGymRoutes from './routes/routes';
import config from './config';
import { initJobs } from './jobs';
import { OAuth2Client } from 'google-auth-library';

const cors = require('cors');

const CLIENT_ID = '935523924383-h3j9osncso40dml2iiltmq9kuc1nteh5.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

const app = express();

app.use(cors({
  origin: config.frontendURL,
  credentials: true
}));

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use('/api/', OpenGymRoutes);

// attempt to login
app.post('/auth/google', async (req, res) => {
  const { token } = req.body;

  try {
    // Verify the token with Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });

    // Get the user’s email

    // @ts-ignore: Testing
    const payload = ticket.getPayload();
    // @ts-ignore: Testing
    const email = payload.email;

    // Check if the email domain matches the university domain
    
    // @ts-ignore: Testing
    if (email.endsWith('@andrew.cmu.edu')) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.json({ success: false, message: 'Invalid email domain' });
    }
  } catch (error) {
    console.error('Error verifying Google ID token:', error);
    res.status(400).json({ success: false, message: 'Invalid token' });
  }
});


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
