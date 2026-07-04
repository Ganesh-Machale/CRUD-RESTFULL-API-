const express = require("express");
const app = express();
const port = 8080;
  const path = require("path");

  app.use(express.urlencoded({extended:true}));
   app.use(express.json());

  app.set("view engine","ejs");
  app.set("views",path.join(__dirname,"views"));

    app.use(express.static(path.join(__dirname,"public")));

    let posts =[
    {
      username:"Ganesh",
      content:"i love coding" 
    },
    {
       username:"Nanduraj",
       content:"i like to play BGMI"
    },
    {
      username:"Atharv",
      content:"i love to view Reels on instagram"
        },
  ];

     app.get("/",(req,res)=>{
        res.send("Server Working Well");
     });

     app.get("/posts/new",(req,res)=>{
      res.render("new.ejs");
     })
    
     app.get("/posts",(req,res)=>{
      res.render("index.ejs",{posts});
     });
      
     app.post("/posts",(req,res)=>{
      let {username,content} = req.body;
        posts.push({username,content});
      res.send("Request Recieve Sucessfully");
     })
   
   app.listen(port,(req,res)=>{
    console.log("Port is Listening to ",port);
   })