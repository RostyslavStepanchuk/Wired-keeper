const express = require('express');
const router = express.Router();
const listsController = require('../controllers/listsController');

// TODO remove fakeRequest, make POST instead of GET
router.get('/create', function(req, res, next) {
    const fakeRequest = {body:
            {
                title: 'React',
                listItems: [{
                    checked: true,
                    task: 'be react ninja asap'
                },
                    {
                        checked: true,
                        task: 'finish the course'
                    },
                    {
                        checked: false,
                        task: 'find a job'
                    }
                ]
            }
    };
    listsController.createList(fakeRequest, res);
});

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