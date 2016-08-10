'use strict';

var express   = require('express'),
    httpCodes = require('../libs/httpCodes'),
    hash      = require('../libs/hash'),
    util      = require('../libs/util'),
    User      = require('../libs/User'),
    db        = require('../models/database'),
    token      = require('../libs/token');


const router = express.Router();


/**
 * EndPoint: /user/info
 **/
router.get('/info', token.validToken, function (req, res) {
  var token = req.decoded;

  db.getUserInfo(token.id, function(err, row) {
    if (err || !row) {
      return res
        .status(httpCodes.INTERNAL_SERVER_ERROR)
        .json({responseMessage: "An error occurred."});
    }
    if (row) {
      return res.status(httpCodes.SUCCESS).json(row);
    }
  });
});


/**
 * Adds a new user to the sqlite3DB.
 * /user
 * TODO: Make sure user doesn't already exist in sqlite3DB.
 **/
router.post('/', function (req, res) {
  var user = new User();
  user.parsePOST(req, function (err) {
    if (err) {
      return res.status(httpCodes.UNPROCESSABLE_ENTITY);
    }

    // Now hash user's password.
    var hashed = hash.hashPassword(user.password);

    // Set the hashed user's password.
    user.password = hashed.hash;

    // Generate id for user.
    user.id = util.generateID();

    // Write to sqlite3DB.
    user.insert(function (err) {
      if (err) {
        return res
          .status(httpCodes.INTERNAL_SERVER_ERROR)
          .json({
            responseMessage: "User could not be added to the sqlite3DB.",
            type: false
          });
      }

      // Removed the password from the user before generating token.
      delete user.password;

      // Generate token.
      var t = token.generateToken(user);

      return res
        .status(httpCodes.SUCCESS)
        .json({
          responseMessage: "User was successfully created.",
          type: true,
          token: t.value,
          expires: t.expiresIn
        });
    });
  })
});



module.exports = router;
