const express = require('express');
const { getCurrentDate } = require('./myLib');

const app = express();

app.use(express.urlencoded({extended:true}))
app.set('view engine','hbs')

app.get('/',(req,res)=>{
    res.setHeader('Content-type','text/html')
    res.end('<h1>Hello world</h1>')
})

app.get('/about',(req,res)=>{
    console.log(__dirname + '/views/about.html');
    res.sendFile(__dirname + '/views/about.html');

})

app.post('/survey',(req,res)=>{
    var now = getCurrentDate();
    var nameInput = req.body.txtName;
    res.render('surveyResult',{name:nameInput,currentDate:now});
})

const PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log("Server is running " + PORT);
