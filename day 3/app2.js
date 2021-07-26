const express = require('express')
const app = express();

app.get('/',(req,res)=>{
    res.setHeader('Content-type','text/html')
    res.end('<h1>Hello world</h1>')
})

app.get('/about',(req,res)=>{
    res.sendFile(__dirname + '/views/about.html');

})

const PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log("Server is running " + PORT);
