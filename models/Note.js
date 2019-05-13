const db = require('../db');
const collection = 'notes';

class Note {
    constructor(title, noteText, id=null) {
        if (id) this.id = id;
        this.title = title;
        this.noteText = noteText;
        }

    send () {
        return db.addOne(collection, this)
    };

    update() {
        return db.updateOne(collection, this);
    }

    static remove(id) {
        return db.deleteOne(collection, id);
    }

    static getAll() {
        return db.getFullCollection(collection)
    }
}

module.exports = Note;
