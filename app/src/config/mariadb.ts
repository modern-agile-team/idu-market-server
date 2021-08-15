import * as db from "mariadb";

const mariadb = db.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PSWORD,
  database: process.env.DB_DATABASE,
  port: 3306,
  connectionLimit: 300,
});

export default mariadb;
