const List = require('../models/List');
const Note = require('../models/Note');

class homeController {
    static async index(req, res) {
        const lists = await List.getAll();
        const notes = await Note.getAll();
        const result = lists.concat(notes).sort((a,b)=> a.created-b.created);
        res.send(result);
    }
}

module.exports = homeController;