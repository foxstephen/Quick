'use strict';
var user = exports;

// Create statement for User table
user.create = 'CREATE TABLE User(         \
          id          STRING PRIMARY KEY, \
          firstname   STRING,             \
          lastname    STRING,             \
          email       STRING,             \
          password    STRING              \
          token       STRING              \
        )';

// Insert statement for User table.
user.insert = 'INSERT INTO User(id, firstname, lastname, email, password, token) ' +
  'VALUES(?, ?, ?, ?, ?, ?);';

user.all = 'SELECT id, firstname, lastname, email FROM User';

user.getUserInfo = 'SELECT email, firstname, lastname FROM User WHERE id = ?';