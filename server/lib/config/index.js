"use strict";

const dotenv = require('dotenv');

const fs = require('fs'); // Read the .env to declare environment variable


if (!process.env.NODE_ENV) {
  throw new Error('NODE_ENV not set');
}

const config = dotenv.config();

if (config.error) {
  throw config.error;
}

module.exports = {
  // Server port
  port: process.env.PORT || 3000,
  // MongoDB connection options
  mongo: {
    uri: process.env.DB_URI || 'mongodb://localhost/snapshot'
  },
  secret: {
    // Used for Jwt, default secret is randomly generated
    auth: process.env.AUTH_SECRET || 'EwIZ9MJWyJ'
  }
};