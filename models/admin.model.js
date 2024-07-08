const mongoose=require('mongoose')

const adminSchema=new mongoose.Schema({

    email:{
        type:String,
        required:true
    },
    password:
    {
        type:String,
        required:true
    },
    ipAddress:{
        type:String
    },
    deviceType:{
        type:String
    }
})

module.exports=mongoose.model('adminTable',adminSchema)