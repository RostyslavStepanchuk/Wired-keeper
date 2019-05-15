const List = require('../models/List');

class ListsController{

    static index (req,res) {
            return List.getAll().then(result=>res.send(result))
    }

    static createList(req, res) {
        try {
            console.log(req.body);
            if (req.body) {
                const list = new List(req.body.title, req.body.listItems);
                    list.send()
                    .then(createdList => res.send(createdList));
            } else throw new Error('Data wasn\'t received by server')
        } catch (e) {
            console.log(`Failed to create new list`);
            console.log(e);
            res.send(e);
        }
    }

    static updateList(req, res) {
        try {
            if (req.body) {
                const list = new List(req.body.title, req.body.listItems, req.params.id);
                list.update()
                    .then(updatedList => res.send(updatedList));
            } else throw new Error('Data wasn\'t received by server')
        } catch (e) {
            console.log(`Failed to update list`);
            console.log(e);
            res.send(e);
        }
    }

    static deleteList(req, res) {
        try {
            console.log(req.params);
            List.remove(req.params.id).then(removedList => {
                if (removedList) res.send(removedList);
                else throw new Error('Requested id wasn\'t found')
            });
        } catch (e) {
            console.log(`Failed to delete list`);
            console.log(e);
            res.send(e);
        }
    }

}

module.exports = ListsController;