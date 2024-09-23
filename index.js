const express = require("express");
const app = express();
const path=require('path');
const { v4: uuidv4 } = require('uuid'); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
const methodOverride = require('method-override')
const port=8080;

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

let posts=[
    {
        id:uuidv4(),
        username:"__aryan_rajj",
        post:"I use instagram daily it affects daily routine",
    },
    {
        id:uuidv4(),
        username:"_shradha_mam",
        post:"i teaches daily on web development courses",
    },
    {
        id:uuidv4(),
        username:"__khapra_mam",
        post:"i am the oly source of single stick in flood support for development",
    }
];
app.get('/',(req,res)=>{
    res.render('index.ejs',{posts})
})
app.get('/posts/new',(req,res)=>{
    res.render('new.ejs');
})
app.post('/post',(req,res)=>{
    let {username,post}=req.body;
    let id=uuidv4();
    posts.push({id,username,post});
    console.log(req.body);   
    // res.send("The POST Page Is Working")
    res.redirect('/');
})
app.get('/posts/:id',(req,res)=>{
    let {id}=req.params;
    let post= posts.find((p)=> p.id===id);
    res.render('show.ejs',{post});
})
app.get('/posts/:id/edit',(req,res)=>{
    let {id}=req.params;
    let post= posts.find((p)=> p.id===id);
    res.render('edit.ejs',{post});
})
app.patch('/posts/:id',(req,res)=>{
    let {content}=req.body;
    let {id}=req.params;
    let post=posts.find((p)=> p.id===id);
    post.post=content;
    console.log(req.body)
    res.redirect('/');
})
app.delete('/posts/:id',(req,res)=>{
    let {id}=req.params;
    posts = posts.filter((p)=> p.id!=id);
    res.redirect('/');
})
app.listen(port,()=>{
    console.log("listening on port 8080");
})
