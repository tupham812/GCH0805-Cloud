const express = require('express')
const app = express()

const {ObjectId} = require('mongodb');

const db = require('./databaseHandler');


app.set('view engine','hbs')
app.use(express.urlencoded({extended:true}))

app.get('/edit',async (req,res)=>{
    const id= req.query.id;
    
    const dbo = await db.getDB();
    const s = await dbo.collection("students").findOne({_id: ObjectId(id)})
    res.render("edit",{student:s});
})
app.post('/update', async (req,res)=>{
    const nameInput = req.body.txtName;
    const tuoiInput = req.body.txtTuoi;
    const id = req.body.txtId;

    db.updateStudent(id,nameInput,tuoiInput);
    res.redirect("/");
})

app.post('/insert',async (req,res)=>{
    const nameInput = req.body.txtName;
    const tuoiInput = req.body.txtTuoi;
    const newStudent = {name:nameInput,tuoi:tuoiInput}

    db.insertStudent(newStudent);
    res.redirect("/");
})
app.get('/delete',async (req,res)=>{
    const id= req.query.id;
    
    const dbo = await db.getDB()
    await dbo.collection("students").deleteOne({"_id":ObjectId(id)});
    res.redirect("/");
})

app.post('/search',async (req,res)=>{
    const searchInput = req.body.txtSearch;
    const dbo = await db.getDB()
    const allStudents = await dbo.collection("students").find({name:searchInput}).toArray();

    res.render('index',{data:allStudents})
})

app.get('/',async (req,res)=>{
    const dbo = await db.getDB();
    const allStudents = await dbo.collection("students").find({}).toArray();
    res.render('index',{data:allStudents})
})

const PORT = process.env.PORT || 5000;
app.listen(PORT)
console.log("app is running ",PORT)





