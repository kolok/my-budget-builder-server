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

const port =  process.env.PORT || 8080
const src = process.env.NODE_ENV === 'production' ? '../dist/index' : './index'

require('babel-polyfill')
if (process.env.NODE_ENV === 'development') { require('babel-register') }
if (process.env.NODE_ENV === 'test') { require('babel-register') }

const app = require(src).default

/*
 *Here we're assigning the server to a variable because
 *we're going to want to manually rip down the server in testing
 */
const server = app.listen(port)
console.log('Server running at ' + port)
console.log('Running in '  + process.env.NODE_ENV +
            ' v' + process.env.npm_package_version)

//Exporting the actual server here for testing availability
module.exports = {server}
