const express = require('express');
const router = express.Router();
const db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.testConnection();

  res.end()
  // db.addOne('users',{testName:'Slava'}).then(result=>res.send(result));
  // db.updateOne('users',{id:"5cd88a2ba204f43f369cea65", update:{testName:'Olezhka',friend:'true'},delete:{sex:"",male:""}}).then(result=>res.send(result));
// db.deleteOne('users','5cd87d18d194c53ea2caaf06').then(result=>res.send(result));
  // db.getFullCollection('users').then(data=>res.send(data));
});

module.exports = router;
