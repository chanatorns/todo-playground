/* eslint-disable no-undef */
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_SCHEMA || "postgres",
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres"
  },
  test: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_SCHEMA || "postgres",
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres"
  }
}