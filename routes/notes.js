const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');

router.get('/', notesController.index);

router.post('/create', notesController.createNote);

// TODO remove fakeRequest, make PUT instead of GET
router.put('/:id/update', function(req, res, next) {
    const fakeRequest = {body:{title:'FirstNote',noteText:'UPDATED Note text'}, params:req.params};
    notesController.updateNote(fakeRequest, res);
});

router.delete('/:id/delete', notesController.deleteNote);

module.exports = router;

