const mongoose=require('mongoose')

const adminToken=new mongoose.Schema({
    token:{
        type:String
    },
    email:{
        type:String
    }
})



module.exports=mongoose.model("adminTokenModel",adminToken)
