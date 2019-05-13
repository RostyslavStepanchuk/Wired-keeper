const List = require('../models/List');

class NotesController{
    static createNote(req, res) {
        try {
            if (req.body) {
                const note = new Note(req.body.title, req.body.noteText);
                console.log(note);
                    note.send()
                    .then(createdNote => res.send(createdNote));
            } else throw new Error('Data wasn\'t received by server')
        } catch (e) {
            console.log(`Failed to create new note`);
            console.log(e);
            res.send(e);
        }
    }

    static updateNote(req, res) {
        try {
            if (req.body) {
                const note = new Note(req.body.title, req.body.noteText, req.body.id);
                console.log(note);
                note.update()
                    .then(createdNote => res.send(createdNote));
            } else throw new Error('Data wasn\'t received by server')
        } catch (e) {
            console.log(`Failed to update note`);
            console.log(e);
            res.send(e);
        }
    }

    static deleteNote(req, res) {
        try {
            console.log(req.params);
            Note.remove(req.params.id).then(removedNote => {
                if (removedNote) res.send(removedNote);
                else throw new Error('Requested id wasn\'t found')
            });
        } catch (e) {
            console.log(`Failed to update note`);
            console.log(e);
            res.send(e);
        }
    }

}

module.exports = NotesController;