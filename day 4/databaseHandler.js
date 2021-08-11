const {ObjectId,MongoClient} = require('mongodb');
const url = 'mongodb://localhost:27017';

async function getDB() {
    const client = await MongoClient.connect(url);
    const dbo = client.db("GCH0805DB");
    return dbo;
}

async function insertStudent(newStudent) {
    const dbo = await getDB();
    await dbo.collection("students").insertOne(newStudent);
}

async function updateStudent(id, nameInput, tuoiInput) {
    const filter = { _id: ObjectId(id) };
    const newValue = { $set: { name: nameInput, tuoi: tuoiInput } };

    const dbo = await getDB();
    await dbo.collection("students").updateOne(filter, newValue);
}

exports.getDB = getDB;
exports.insertStudent = insertStudent;
exports.updateStudent = updateStudent;
