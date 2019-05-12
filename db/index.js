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
            return data
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
            collection.insertOne (data);
            console.log(`Data added to ${collectionName}`);
            return true
        } catch (e) {
            console.log(`Failed to add data to "${collectionName}" collection`);
            console.log(e);
        } finally {
            disconnect(client);
        }
    }

    static async getOne (collectionName,filter) {
        const client = await connect();
        try {
            const collection = client.db(dbName).collection(collectionName);
            const data = await collection.find(filter).toArray();
            if (!data.length) {throw new Error('Document was not found')
            } else {
                const dataDescription = Object.keys(filter).map(key=>`${key}:${filter[key]}`);
                console.log(`Data {${dataDescription}} retrieved from "${collectionName}" collection`);
                return data
            }
        } catch (e) {
            console.log(`Failed to get document from "${collectionName}" collection`);
            console.log(e);
        } finally {
            disconnect(client);
        }
    }
}

module.exports = Db;