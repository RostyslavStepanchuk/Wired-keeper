const login = process.env.mongoLogin;
const password = process.env.mongoPassword;
module.exports = {
    url: "mongodb+srv://testclusterslava-gz8as.mongodb.net/test",
        dbName: "Wired-keeper",
    options: {
        useNewUrlParser: true,
        retryWrites:true,
        auth: {
            keepAlive: 8000,
            reconnectTries: 5,
            user:login,
            password: password
        }
    }
};