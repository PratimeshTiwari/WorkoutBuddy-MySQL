import {DB_NAME,DB_HOST,DB_USER,DB_PASSWORD} from '../constants.js';
import mysql from 'mysql2/promise';
let pool;
async function initDB() {
  if(!pool) {
    pool = mysql.createPool({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
    console.log(`Connected to MySQL on host : ${DB_HOST} with user ${DB_USER}`);
  }
  return pool;
}
export {pool,initDB};