import express from 'express';
// import path from 'node:path';
import db from './config/connection.js';
import routes from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// // if we're in production, serve client/build as static assets
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('/client/dist'));
// }

const dbUri = process.env.NODE_ENV === 'production' ? process.env.MONGO_URI && app.use(express.static('/client/dist')) : process.env.MONGODB_URI;

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});


require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error: any) => console.error('Error connecting to MongoDB:', error));

