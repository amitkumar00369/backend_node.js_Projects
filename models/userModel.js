const mongoose=require('mongoose')


// {$set:{identity:{AdharNo:{uNo},PanNo:{pNo}},Gender:sex,courses:{course_01:{course_name:cn,date:Date.now()
// },course_02:{course_name:cn2,date:Date.now()}}}})

const Users=new mongoose.Schema({
    name:{
        type:String
    },
    mobileNo:{
        type:Number
    },
    password:{
        type:String
    },
    country:{
        type:String
    },
    email:{
        type:String
    },
    deviceType:{
        type:String

    },
    identity:{
        AdharNo:{
            type:String,
            
        },
        PanNo:{
            type:String,
            
        },
        Gender:{
            type:String,
        },
        courses:{
            course_01:{
                course_name:{
                    type:String,
                },
                date:{
                    type:Date
                }
            },
            course_02:{
                course_name:{
                    type:String,
                },
                date:{
                    type:Date
                }
            }
        }

    }
})


module.exports =mongoose.model("Users",Users)