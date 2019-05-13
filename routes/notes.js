const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/create', function(req, res, next) {
res.send('note created')
});

router.put('/:id/update', function(req, res, next) {
    res.send('note updated')
});

router.get('/:id/delete', function(req, res, next) {
    res.send('note deleted')
});

module.exports = router;