const express = require('express')
const app = express()

const {ObjectId,MongoClient} = require('mongodb')

//dia chi cua server mongodb
const url = 'mongodb://localhost:27017';


app.set('view engine','hbs')
app.use(express.urlencoded({extended:true}))


app.post('/insert',async (req,res)=>{
    const nameInput = req.body.txtName;
    const tuoiInput = req.body.txtTuoi;
    const newStudent = {name:nameInput,tuoi:tuoiInput}

    const client= await MongoClient.connect(url);
    const dbo = client.db("GCH0805DB");
    await dbo.collection("students").insertOne(newStudent);
    res.redirect("/");
})
app.get('/delete',async (req,res)=>{
    const id= req.query.id;
    
    const client= await MongoClient.connect(url);
    const dbo = client.db("GCH0805DB");
    await dbo.collection("students").deleteOne({"_id":ObjectId(id)});
    res.redirect("/");

})

app.post('/search',async (req,res)=>{
    const searchInput = req.body.txtSearch;
    const client= await MongoClient.connect(url);
    const dbo = client.db("GCH0805DB");
    const allStudents = await dbo.collection("students").find({name:searchInput}).toArray();

    res.render('index',{data:allStudents})
})

app.get('/',async (req,res)=>{
    const client= await MongoClient.connect(url);
    const dbo = client.db("GCH0805DB");
    const allStudents = await dbo.collection("students").find({}).toArray();

    res.render('index',{data:allStudents})
})

const PORT = process.env.PORT || 5000;
app.listen(PORT)
console.log("app is running ",PORT)