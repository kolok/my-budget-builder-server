'use strict'

const dotenv = require('dotenv')
const fs = require('fs')

if (!process.env.NODE_ENV) {
  throw new Error('NODE_ENV not set')
}

//We need to overwrite ENV configuration for test
if (process.env.NODE_ENV === 'test') {
  const envConfig = dotenv.parse(fs.readFileSync('.env.test'))
  for (let k in envConfig) {
    process.env[k] = envConfig[k]
  }
} else {
  dotenv.config()
}

module.exports = {
  'development': {
    'username': process.env.DB_USER,
    'password': process.env.DB_PASSWORD,
    'database': process.env.DB_DATABASE,
    'host': process.env.DB_HOST,
    'dialect': 'postgres',
    'port': process.env.DB_PORT,
    'pool': { 'max': 5, 'min': 0, 'idle': 10000 },
    'define': { 'freezeTableName': true, 'timestamps': false },
    'logging': console.log
  },
  'test': {
    'username': process.env.DB_USER,
    'password': process.env.DB_PASSWORD,
    'database': process.env.DB_DATABASE,
    'host': process.env.DB_HOST,
    'dialect': 'postgres',
    'port': process.env.DB_PORT,
    'pool': { 'max': 5, 'min': 0, 'idle': 10000 },
    'define': { 'freezeTableName': true, 'timestamps': false },
    'logging': console.log
  },
  'production': {
    'username': process.env.DB_USER,
    'password': process.env.DB_PASSWORD,
    'database': process.env.DB_DATABASE,
    'host': process.env.DB_HOST,
    'dialect': 'postgres',
    'port': process.env.DB_PORT,
    'pool': { 'max': 5, 'min': 0, 'idle': 10000 },
    'define': { 'freezeTableName': true, 'timestamps': false },
    'logging': false
  }
}
