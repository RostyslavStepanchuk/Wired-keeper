const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');

// TODO remove fakeRequest, make POST instead of GET
router.get('/create', function(req, res, next) {
    const fakeRequest = {body:{title:'FirstNote',noteText:'UPDATED Note text'}};
    notesController.createNote(fakeRequest, res);
});

// TODO remove fakeRequest, make PUT instead of GET
router.put('/:id/update', function(req, res, next) {
    const fakeRequest = {body:{title:'FirstNote',noteText:'UPDATED Note text'}, params:req.params};
    notesController.updateNote(fakeRequest, res);
});

router.get('/:id/delete', notesController.deleteNote);

module.exports = router;

