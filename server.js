const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt=require("bcrypt");
const registerModel=require("./models/registerSchema");
const loginModel=require("./models/loginSchema")
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname+"/static"))
mongoose.connect("mongodb+srv://sarath:sarath1104@cluster0.j6w2pyy.mongodb.net/userDB?retryWrites=true&w=majority", {
    useNewUrlParser: true
});  

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/home.html")
})
app.get("/main",(req,res)=>{
    res.sendFile(__dirname+"/main.html") 
})
app.get("/about.html",(req,res)=>{
    res.sendFile(__dirname+"/about.html")
})
app.get("/home.html",(req,res)=>{
    res.sendFile(__dirname+"/home.html")
})
app.get("/contact.html",(req,res)=>{
  res.sendFile(__dirname+"/contact.html")
})
app.post("/register", async (req, res) => {
try {
      const { userName, Password,Email} = req.body;

      const existingUser = await registerModel.findOne({ userName });
      if (existingUser) {
        return res.status(400).send("User already exists");
      }
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(Password, saltRounds);
  
      const newUser = new registerModel({ userName, Password: hashedPassword ,Email});
      await newUser.save();
  
     
       res.redirect("/");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });
app.post("/login", async (req, res) => {
    try {
      const { Email, Password } = req.body;
      const emailExists = await registerModel.findOne({ Email });
  
      if (emailExists) {
        const passwordMatch = await bcrypt.compare(Password, emailExists.Password);
  
        if (passwordMatch) {
          const loginUser = new loginModel(req.body);
          await loginUser.save();
          res.redirect("/main");
        } else {
          res.status(401).send("Incorrect password");
        }
      } else {
        res.status(404).send("User not found");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });
app.listen(5000,()=>console.log("server is ramping"))







