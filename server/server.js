require('dotenv').config()

const cron = require('node-cron');
const express = require('express');
const mongoose = require('mongoose');
const OpenGymRoutes = require('./routes/routes');
const db = require("./models/database");

const app = express();

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/', OpenGymRoutes)

// connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to database");

        // weekly clearing database
        cron.schedule('0 0 * * 0', async () => {
            db.moveAllData();
        });
        
        // listen on port
        app.listen(process.env.PORT, () => {
            console.log("Listening on port", process.env.PORT)
        });
    })
    .catch(err => console.log(err));
