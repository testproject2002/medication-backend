import express from 'express';
import db from './models/index.js';  // Ensure correct import with .js extension
import authRoutes from './router/auth.router.js'
import itemRoutes from './router/itemcreate.route.js'
const app = express();
const PORT = process.env.PORT || 5000;
import cors from 'cors';
app.use(cors());
import dotenv from 'dotenv';
dotenv.config();



app.use(express.json());
// Sync models with the database
db.sequelize.authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
    return db.sequelize.sync();  // Sync models with the database
  })
  .then(() => {
    console.log('Database synced.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  app.use('/api/user', authRoutes);
  app.use('/api/items', itemRoutes);

app.listen(PORT, () => {
  console.log(`Server connected to port: ${PORT}`);
});
