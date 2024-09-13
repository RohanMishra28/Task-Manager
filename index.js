// 1.setup
const express = require('express');
const path = require('path')
const app = express();

const fs= require('fs');

// 1->setup
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,"public")))

// 1->setup
app.get('/', (req,res)=>{
  res.send("Server working succesfully!")
})


// 3->frontpage
app.get('/tasks',(req,res)=>{
  fs.readdir(`./files`,(err,files)=>{
    res.render('index.ejs',{files:files})
  })
})

// 2->to create the file with the provided data
app.post('/create',(req,res)=>{
  fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details,(err)=>{
    res.redirect("/tasks")
  });

})

// 4->to show details
app.get('/:fileName',(req,res)=>{
fs.readFile(`./files/${req.params.fileName}`,"utf-8", (err,filedata)=>{
  res.render('show.ejs', {fileName:req.params.fileName, filedata:filedata});
})
})

// 5->to delete a file 
app.get('/:fileName/delete',(req,res)=>{
  fs.unlink(`./files/${req.params.fileName}`,()=>{
    res.redirect('/tasks');
    })
})


// 1->setup
app.listen(3000, (req,res)=>{
  console.log("Server started at 3000");
})