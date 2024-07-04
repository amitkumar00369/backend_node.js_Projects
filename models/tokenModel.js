const mongoose=require('mongoose')

const tokenSchema=new mongoose.Schema({
    email:{
        type:String,
        
    },
    token:{
        type:String
    }
})


module.exports=mongoose.model("tokenModel",tokenSchema)