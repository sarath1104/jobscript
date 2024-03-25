const mongoose=require("mongoose");

const loginSchema=mongoose.Schema({
    Email:{
        type:String,
    },
    Password:{
        type:String,
        
    }
})
const loginModel=mongoose.model("LoginUser",loginSchema);
module.exports=loginModel