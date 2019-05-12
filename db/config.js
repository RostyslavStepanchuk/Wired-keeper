module.exports = {

    url: "mongodb+srv://testclusterslava-gz8as.mongodb.net/test",
        dbName: "Wired-keeper",
    options: {
        useNewUrlParser: true,
        retryWrites:true,
        auth: {
            keepAlive: 8000,
            reconnectTries: 5,
            user:'Slava',
            password: '123'
        }
    }
};