import { Sequelize, DataTypes } from 'sequelize';
import config from '../configuration/database.js';  // Ensure the correct path and extension

// Choose the environment (development, test, production)
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

// Initialize Sequelize
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  logging: dbConfig.logging || false, // Optional, remove if not necessary
});

// Test the connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

const db = {};

// Import and initialize models
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = (await import('../models/user.js')).default(sequelize, DataTypes);
db.Item = (await import('../models/item.js')).default(sequelize, DataTypes);

// Export Sequelize models
db.sequelize = sequelize;

// Export Firestore DB

// Export the db object as default
export default db;
