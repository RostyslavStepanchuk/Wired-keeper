const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');

// TODO remove fakeRequest
router.get('/create', function(req, res, next) {
    const fakeRequest = {body:{title:'FirstNote',noteText:'UPDATED Note text'}};
    notesController.createNote(fakeRequest, res);
});

// TODO remove fakeRequest
router.put('/:id/update', function(req, res, next) {
    const fakeRequest = {body:{title:'FirstNote',noteText:'UPDATED Note text', id:'5cd93603c8779045a5ffc329'}};
    notesController.updateNote(fakeRequest, res);
});

router.get('/:id/delete', notesController.deleteNote);

module.exports = router;

