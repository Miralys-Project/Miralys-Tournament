import { createConnection } from 'mysql2';
import { Logger } from './Logger.js';

const Database = createConnection({
  host:
    process.env.PROD === 'true'
      ? process.env.PROD_DB_HOST
      : process.env.DEV_DB_HOST,
  user:
    process.env.PROD === 'true'
      ? process.env.PROD_DB_USER
      : process.env.DEV_DB_USER,
  password:
    process.env.PROD === 'true'
      ? process.env.PROD_DB_PASSWORD
      : process.env.DEV_DB_PASSWORD,
  database:
    process.env.PROD === 'true'
      ? process.env.PROD_DB_NAME
      : process.env.DEV_DB_NAME,
});

Database.connect(err => {
  if (err) {
    Logger.error('Error connecting to the database:\n' + err);
    return;
  }
  Logger.database('Connected to the database');
});

export { Database };
