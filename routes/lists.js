const express = require('express');
const router = express.Router();
const listsController = require('../controllers/listsController');

router.get('/', listsController.index);


router.post('/create', listsController.createList);

router.put('/:id/update', listsController.updateList);

router.delete('/:id/delete', listsController.deleteList);

module.exports = router;