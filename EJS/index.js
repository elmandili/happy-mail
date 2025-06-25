const express = require('express')
const ejs = require('ejs');

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req,res)=>{
    res.render('main');
})

app.get('/stats' , (req,res)=>{
    res.render('stats')
})

app.listen(3000, ()=>{
    console.log("Server is running on port " + 3000);
})