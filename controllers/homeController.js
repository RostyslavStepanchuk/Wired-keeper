const List = require('../models/List');
const Note = require('../models/Note');

class homeController {
    static async index(req, res) {
        const lists = await List.getAll().then(result=>
            result.map(list=> {
                list.type = 'list';
                return list
            }));
        const notes = await Note.getAll().then(result=>
            result.map(note=> {
                note.type = 'note';
                return note
            }));
        const result = lists.concat(notes).sort((a,b)=> a.created-b.created);
        res.send(result);
    }
}

module.exports = homeController;