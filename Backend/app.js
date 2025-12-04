import express from 'express';
import 'dotenv/config';
import router from './routes/product.routes.js';
import bodyParser from 'body-parser';
import { connectDB } from './config/db.js';

const app = express();
const port = process.env.PORT || 5000;

// JSON parsing middleware
app.use(bodyParser.json());

// Connect to MongoDB and then start server
const startServer = async () => {
  try {
    await connectDB();
    console.log('MongoDB connected');

    // Mount routes **after DB is connected**
    app.use('/api/',router);

    app.listen(port, () => {
      console.log('Server is online');
      console.log(`Server is running on ${port}`);
    });
  } catch (err) {
    console.error(`Error connecting to database: ${err}`);
  }
};

startServer();
