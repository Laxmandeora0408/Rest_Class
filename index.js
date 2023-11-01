const express = require('express');
const app = express();
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const  methodOverride = require('method-override');

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.set("view engine", "ejs"); 
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

const port = 8080;

let posts = [
    {
        id:uuidv4(),
        username :"laxman Deora",
        content : "i love coding ninja",

    },
    {
        id:uuidv4(),
        username :"Purvesh Deora",
        content : "they always says to work hard",

    },
    {
        id:uuidv4(),
        username :"devanshi minda",
        content : "she rejected me",

    },
    {
        id:uuidv4(),
        username :"khushi borana",
        content : "she cheated me",

    },
    {
        id:uuidv4(),
        username :"kajal",
        content : "she loves me",

    },
]

app.get("/posts" , (req,res) =>{
    res.render("index.ejs", {posts});
})

app.get("/posts/new", (req,res) =>{
    res.render("new.ejs");
});

app.post("/posts", (req,res) =>{
    let {username,content,id} = req.body;
    posts.push({username,content,id});
    res.redirect("/posts");
});

app.get("/posts/:id", (req,res) =>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", {post}); 
})

app.patch("/posts/:id", (req,res) =>{
    let {id} =req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    res.redirect("/posts");

})

app.get("/posts/:id/edit", (req,res) =>{
    let {id} = req.params;
    post = posts.find((p) => id === p.id);
    res.render("edit.ejs",{post});
})

app.delete("/posts/:id", (req,res) =>{
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
})

app.listen(port, () =>{
    console.log(`listening on port ${port }`)
});
