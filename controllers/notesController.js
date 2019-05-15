const Note = require('../models/Note');

class NotesController{

    static index (req,res) {
        return Note.getAll().then(result=>
            result.map(note=> {
                note.type = 'note';
                return note
            }))
            .then(notes=>res.send(notes));
    }

    static createNote(req, res) {
        try {
            if (req.body) {
                const note = new Note(req.body.title, req.body.noteText);
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
                const note = new Note(req.body.title, req.body.noteText, req.params.id);
                note.update()
                    .then(updatedNote => res.send(updatedNote));
            } else throw new Error('Data wasn\'t received by server')
        } catch (e) {
            console.log(`Failed to update note`);
            console.log(e);
            res.send(e);
        }
    }

    static deleteNote(req, res) {
        try {
            Note.remove(req.params.id).then(removedNote => {
                if (removedNote) res.send(removedNote);
                else throw new Error('Requested id wasn\'t found')
            });
        } catch (e) {
            console.log(`Failed to delete note`);
            console.log(e);
            res.send(e);
        }
    }

}

module.exports = NotesController;