const express = require('express');
const router = express.Router();
const listsController = require('../controllers/listsController');

router.get('/', listsController.index);


router.post('/create', listsController.createList);

// TODO remove fakeRequest, make PUT instead of GET
router.get('/:id/update', function(req, res, next) {
    console.log(req.params);
    const fakeRequest = {
        body:
            {
                title: 'UPDATED React',
                listItems: [{
                    checked: true,
                    task: 'be react ninja asap'
                },
                    {
                        checked: false,
                        task: 'finish the course'
                    }
                ]
            },
        params: req.params
    };
    listsController.updateList(fakeRequest, res);
});

router.get('/:id/delete', listsController.deleteList);

module.exports = router;