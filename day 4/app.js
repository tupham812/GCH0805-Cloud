const express = require('express')
const session = require('express-session');

const app = express()

const { insertStudent, updateStudent, getStudentById, deleteStudent
    , getDB, insertUser,getRole } = require('./databaseHandler');

app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: '156655hjkkjhgggghgg',
    cookie: { maxAge: 600000 }
}));

app.post('/register',async (req,res)=>{
    const name = req.body.txtName;
    const pass = req.body.txtPassword;
    const role = req.body.role;
    insertUser({name:name,pass:pass,role:role})
    res.redirect('/login')
})

app.get('/login',(req,res)=>{
    res.render('login')
})
app.post('/doLogin',async (req,res)=>{
    const name = req.body.txtName;
    const pass = req.body.txtPassword;
    console.log(name)
    //get role from database: could be "-1", admin, customer
    var role = await getRole(name,pass);
    if(role != "-1"){
        req.session["User"] = {
            name: 'tom',
            role: role
        }
    }
    res.redirect('/');
})

app.get('/edit', async (req, res) => {
    const id = req.query.id;

    const s = await getStudentById(id);
    res.render("edit", { student: s });
})
app.post('/update', async (req, res) => {
    const nameInput = req.body.txtName;
    const tuoiInput = req.body.txtTuoi;
    const id = req.body.txtId;

    updateStudent(id, nameInput, tuoiInput);
    res.redirect("/");
})

app.post('/insert', async (req, res) => {
    const nameInput = req.body.txtName;
    const tuoiInput = req.body.txtTuoi;
    const pictureInput = req.body.txtPicture;
    const newStudent = { name: nameInput, tuoi: tuoiInput, picture: pictureInput }

    insertStudent(newStudent);
    res.redirect("/");
})
app.get('/delete', async (req, res) => {
    const id = req.query.id;

    await deleteStudent(id);
    res.redirect("/");
})

app.post('/search', async (req, res) => {
    const searchInput = req.body.txtSearch;
    const dbo = await getDB()
    const allStudents = await dbo.collection("students").find({ name: searchInput }).toArray();

    res.render('index', { data: allStudents })
})

app.get('/', async (req, res) => {
    if(req.session["User"] == null){
        res.redirect('/login')
    }
    const dbo = await getDB();
    const allStudents = await dbo.collection("students").find({}).toArray();
    res.render('index', { data: allStudents, auth :req.session["User"] })
})

const PORT = process.env.PORT || 5000;
app.listen(PORT)
console.log("app is running ", PORT)


