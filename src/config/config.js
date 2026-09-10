const dotenv = require('dotenv');
dotenv.config();
const { PORT } = process.env;
const {
  HOST, USER, PASSWORD, DB, DB_PORT,
  FRONTEND_URL, SECRET_JWT_KEY,
} = process.env;

module.exports = {
  PORT,
  HOST,
  USER,
  PASSWORD,
  DB,
  DB_PORT,
  FRONTEND_URL,
  SECRET_JWT_KEY,
};
