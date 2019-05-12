const express = require('express');
const router = express.Router();
const db = require('../db');

/* GET home page. */
router.get('/test', function(req, res, next) {
  console.log('works');
  db.testConnection();
  res.send('WORKS');
});

module.exports = router;
