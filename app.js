const express = require('express');
require('dotenv').config();

const connectDB = require('./db/connect');
const taskRoutes = require('./routes/tasks.route');
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// Configs
const app = express();
const port = process.env.PORT || 8000;

// Middlewares
app.use(express.static('./public'));
app.use(express.json());

// Routes
app.use('/api/v1/tasks', taskRoutes);
app.use(notFound);
app.use(errorHandlerMiddleware);

// Connect to the DB and spin up the server
const startApp = async () => {
  try {
    await connectDB(process.env.DB_URL);
    console.log('Connected to DB!');
    app.listen(port, () => {
      console.log(`Server running successfully on port ${port}...`);
    });
  } catch (error) {
    console.error('DB connection failed!');
    console.log(error);
  }
}
startApp();

// Start from 1:26:31 (https://youtu.be/rltfdjcXjmk?list=PLnHJACx3NwAdl4yeJF6LzjDiLyW1yF9Ds)
