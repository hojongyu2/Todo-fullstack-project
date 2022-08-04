const { MongoClient } = require("mongodb");
require("dotenv").config();

let db;

async function mongoConnect() {
    const uri = process.env.MONGO_URI;
    const client = new MongoClient(uri);
    try {
        await client.connect();
        db = await client.db(process.env.MONGO_DATABASE);
        console.log("db connected");
    } catch (error) {
        console.error(error)
    }
}
function blogsDB() {
    return db;
}
module.exports = {
    mongoConnect,
    blogsDB,
};