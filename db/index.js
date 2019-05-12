const {url, options, dbName} = require('./config'),
    {MongoClient, ObjectId} = require('mongodb');

connect = () => MongoClient.connect(url, options)
    .then(client => {
        return client
    })
    .catch(err => {
        console.log('Failed to connect');
        console.log(err);
    });


disconnect = client => new Promise (()=> {
    client.close();
}).catch(err=>{
    console.log('Failed to disconnect');
    console.log(err);
});

getIdAndTimeStamp = (mongoObj) => {
    mongoObj.id = mongoObj._id.toString();
    mongoObj.created = mongoObj._id.getTimestamp();
    delete mongoObj._id;
    return mongoObj;
};

transformIdToMongo = (obj) => {
    obj._id = new ObjectId(obj.id);
    delete obj.id;
    return obj
};


class Db {
    static testConnection () {
        connect()
            .then((client)=>{
                console.log('CONNECTION TEST IS SUCCESSFUL');
                return client
            })
            .then((client)=>disconnect(client))}

    static async getFullCollection(collectionName) {
        const client = await connect();
        try {
            const collection = client.db(dbName).collection(collectionName);
            const data = await collection.find({}).toArray();
            console.log(`"${collectionName}" collection scope received`);
            return data.map(obj=>getIdAndTimeStamp(obj))
        } catch (e) {
            console.log(`Failed to get "${collectionName}" collection data`);
            console.log(e);
        } finally {
            disconnect(client);
        }
    }

    static async addOne (collectionName,data){
        const client = await connect();
        try {
            const collection = client.db(dbName).collection(collectionName);
            const insertResult = await collection.insertOne(data);
            console.log(`Data added to "${collectionName}" collection with new id ${insertResult.insertedId}`);
            return getIdAndTimeStamp(insertResult.ops[0]);
        } catch (e) {
            console.log(`Failed to add data to "${collectionName}" collection`);
            console.log(e);
        } finally {
            disconnect(client);
        }
    }

    static async updateOne (collectionName, data) {
        const doc = transformIdToMongo(data);
        const client = await connect();
        try {
            const collection = client.db(dbName).collection(collectionName);
            const updateResult = await collection.findOneAndUpdate({_id:doc._id},{"$set":doc.update,"$unset":doc.delete},{returnOriginal: false});
            if (updateResult.value) {
                console.log(`Object ${updateResult.value._id} updated in "${collectionName}"`);
                return getIdAndTimeStamp(updateResult.value);
            } else throw new Error(`Object ${doc._id} wasn't found`);
        } catch (e) {
            console.log(`Failed to update object ${data.id} in "${collectionName}" collection`);
            console.log(e);
        } finally {
            disconnect(client);
        }
    }

    static async deleteOne (collectionName,id) {
        const client = await connect();
        try {
            const collection = client.db(dbName).collection(collectionName);
            const deleteResult = await collection.findOneAndDelete({_id:new ObjectId(id)});
            if (deleteResult.value) {
                console.log(`Object ${deleteResult.value._id} deleted from "${collectionName}"`);
                return getIdAndTimeStamp(deleteResult.value);
            } else throw new Error(`Object ${doc._id} wasn't found`);
        } catch (e) {
            console.log(`Failed to update object ${data.id} in "${collectionName}" collection`);
            console.log(e);
        } finally {
            disconnect(client);
        }
    }
}

module.exports = Db;