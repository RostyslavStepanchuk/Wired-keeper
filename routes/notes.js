const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');

router.get('/', notesController.index);

router.post('/create', notesController.createNote);

router.put('/:id/update', notesController.updateNote);

router.delete('/:id/delete', notesController.deleteNote);

module.exports = router;

