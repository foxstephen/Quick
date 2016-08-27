'use strict';

var 
  token   = require('../libs/token'),
  db      = require('../models/database');

var runConfig = exports;


/**
 *  Attempts to set the token secret for the application.
 *  @return {boolean} - True if the token was set, otherwise false.
 */
runConfig.tokenSecret = function () {
  return token.setApplicationTokenSecret();
};


/**
 * Attempts to locate the database file and set in configurations.
 * @return {boolean} - True if the sqlite3DB was located and value
 *                      set in configurations; otherwise false.
 */
runConfig.locateDatabase = function () {
  return db.locate();
};