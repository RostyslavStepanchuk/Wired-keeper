const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/create', function(req, res, next) {
res.send('list created')
});

router.put('/:id/update', function(req, res, next) {
    res.send('list updated')
});

router.get('/:id/delete', function(req, res, next) {
    res.send('list deleted')
});

module.exports = router;