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
        username :"devanshiminda",
        content : "happy-Go-Lucky",

    },
    {
        id:uuidv4(),
        username :"devjoshi28",
        content : "I am an ecplore crew member , artist balveer ",

    },
    {
        id:uuidv4(),
        username :"laxmandeora0408",
        content : "Ignore everything with a simle",

    },
    {
        id:uuidv4(),
        username :"khushi borana",
        content : "duniya me kitna gum hai . mera gum inta kam he jb  uska gum dekha to mera gum bhul gya",

    },
    {
        id:uuidv4(),
        username :"kajal",
        content : "sabme kuch to kmi he kon he jisme kami nhi he aasman ke pass v jami nhi he",

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
