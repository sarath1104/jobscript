const mongoose=require("mongoose");
const registerSchema=mongoose.Schema({
    userName:{
        type:String,
    },
    Password:{
        type:String,
        
    },
    Email:{
        type:String
    },
   
})
const registerModel=mongoose.model("RegisterUser",registerSchema);
module.exports=registerModel;