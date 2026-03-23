const express = require("express");
const app = express();
 const methodOverride = require('method-override')

const port = 8080;
  const path = require("path");
  const { v4 : uuidv4 } = require("uuid");
  
app.use(methodOverride('_method'));

  app.use(express.urlencoded({extended:true}));
   app.use(express.json());

  app.set("view engine","ejs");
  app.set("views",path.join(__dirname,"views"));

    app.use(express.static(path.join(__dirname,"public")));

    let posts =[
    {
      id:uuidv4(),
      username:"Ganesh",
      content:"i love coding" 
    },
    {
        id:uuidv4(),
       username:"Nanduraj",
       content:"i like to play BGMI"
    },
    {
        id:uuidv4(),
      username:"Atharv",
      content:"i love to view Reels on instagram"
        },
  ];
     //this req is for home page
     app.get("/",(req,res)=>{
        res.send("Server Working Well");
     });
     //this req is for showing Existed posts
     app.get("/posts",(req,res)=>{
      res.render("index.ejs",{posts});
     });
     
       //this req is for creating new posts
     app.get("/posts/new",(req,res)=>{
      res.render("new.ejs");
     })
      
     //this post req is used to push data in posts array or used to create new posts
     app.post("/posts",(req,res)=>{
      let {username,content} = req.body;
       let id  = uuidv4();
        posts.push({id,username,content});
      res.redirect("/posts"); 
     });

      //this req is for search a specific post by its id 
     app.get("/posts/:id",(req,res)=>{
      let {id} = req.params;
      console.log(id);
       let post  = posts.find((p)=> id === p.id);
       res.render("show.ejs", { post });
     });
      
     // //this req is for search a specific post by its id & change something in that post
      app.patch("/posts/:id",(req,res)=>{
        let {id} = req.params;
        let newcontent = req.body.content;
        let post  = posts.find((p)=> id === p.id);
        post.content = newcontent;
         console.log();
      res.redirect("/posts");
      })
      
        // craeting this route for editing the post 
        app.get("/posts/:id/edit", (req,res)=>{
          let {id} = req.params;
           let post  = posts.find((p)=> id === p.id);
          res.render("edit.ejs",{post});
        });

        // creating this route for deleting for a specific post
         app.delete("/posts/:id",(req,res)=>{
          let {id} = req.params;
           posts  = posts.filter((p)=> id !== p.id);
          res.redirect("/posts");
         })
      
 
   app.listen(port,(req,res)=>{
    console.log("Port is Listening to ",port);
   })