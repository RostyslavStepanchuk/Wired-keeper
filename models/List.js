const db = require('../db');
const collection = 'lists';

class Note {
    constructor(title, listItems, id=null) {
        if (id) this.id = id;
        this.title = title;
        this.listItems = listItems;
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
