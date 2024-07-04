const users = require("../models/userModel");
const tokens=require('../models/tokenModel')
// const otp = require("../model/user.otp");
const error = require("../utils/errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otpvalue = 1234;
const salt = 10;
require("dotenv").config()
const auth=require('../middleware/authMiddleware')
const re=require('re')

const UserSignUp=async(req,res)=>{
    try{
        const {name,email,mobileNo,country,password}=req.body;
        // console.log(email)

        const existuser= await users.findOne({email:email});
        // console.log("hello",existuser);
        if (existuser){
            return res.status(error.status.OK).json({
                message: "user already has registered",
                
              });
        }
        // console.log("hello")

        const hashpass=await bcrypt.hash(password,10);
        const user=await users.create({email:email,name:name,mobileNo:mobileNo,country:country,password:hashpass})

        

        return res.status(error.status.OK).json({
            message: "user Create Successfully ",
            data: user
          });
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}


const userLogIn=async(req,res)=>{
    try{
        const {email,password}=req.body;
    
        const find=await users.findOne({email:email})
        if(!find){
            return res.status(error.status.NotFound).json({
                message:"User Not Found",
                status:error.status.NotFound
            })
        }
        const pass=await bcrypt.compare(password,find.password)
        if(!pass){
            return res.status(error.status.BadRequest).json({
                message:"Password is worng !",
                status:error.status.BadRequest
            })
        }

        const token= await jwt.sign({userId:find._id},process.env.SECRET)
        const tokenUser=await tokens.findOne({email:find.email})
        if(!tokenUser){
            await tokens.create({email:find.email,token:token})
        }
        else{
            await tokens.create({email:find.email,token:token})
        }
        const userAgent = req.headers['user-agent'].toLowerCase();
        let deviceType;
        if (/mobile|android|iphone/.test(userAgent)) {
            deviceType = 'mobile';
        } else if (/tablet|ipad/.test(userAgent)) {
            deviceType = 'tablet';
        } else {
            deviceType = 'desktop';
        }

        // Save device type in the user model (adjust this part according to your schema)
        find.deviceType = deviceType;
        await find.save();
        



        return res.status(error.status.OK).json({
            message:"User Login Successfully",
            email:email,
            deviceType:find.deviceType,
            token:token
        })

         

    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}

const userLogOut=async(req,res)=>{
try{
    // let user=auth.req.currentUser;
    // console.log("welcome",user)
    console.log("Middleware should have set currentUser:", currentUser);
   
    const finds=await users.findOne({email:currentUser.email})
    const tokenfind=await tokens.deleteOne({email:currentUser.email})
    // console.log("value",finds.email)
    if(finds){
        return res.status(200).json({
        message:"Logout Successfully",
    })}
    else{
        return res.status(error.status.NotFound).json({
            message:"User Not Found",
            status:error.status.NotFound
        })
    }    
 
}
catch(error){
    console.error(error);
   
    
}
}

const changePassword=async(req,res)=>{
    try{
        const {oldPassword,newPassword}=req.body;
        const user=await users.findOne({email:currentUser.email})
        // const tokenUser=await tokens.findOne({})
        if (!user){
            return res.status(error.status.BadRequest).json({
                message:'User Not Found'
            })
        }

        const compPass=await bcrypt.compare(oldPassword,user.password)
        if (!compPass){
            return res.status(error.status.BadRequest).json({
                message:'Please enter correct old password !'
            })


        }
        const encryPass=await bcrypt.hash(newPassword,10)
        user.password=encryPass;
        user.save()

        // let userUpdate=await users.updateOne({email:user.email},{password:encryPass})

        return res.status(error.status.OK).json({
            message:"User change password successfull",
            data:user
        })

    }
    catch(error){
        console.error(error);
        return res.status(error.status.InternalServerError).json({
            message:"Internal server error"
        })
    }
}

const setPassword=async(req,res)=>{
    try{
        const {password}=req.body;
        if (!password){
            return res.status(error.status.BadRequest).json({
                message:"please enter password",
                code:400
            })
        }
        let user=await users.findOne({email:currentUser.email})
        if (!user){
            return res.status(error.status.NotFound).json({
                message:"User not found",
                code:404
            })
        }
        const hashPass=await bcrypt.hash(password,10)
        user.password=hashPass;
        user.save()
        return res.status(error.status.OK).json({
            message:"new password successfully change",
            email:user.email,
            password:password,
            code:200

        })

    }
    catch(error){
        console.error(error);
        return res.status(error.status.InternalServerError).json({
            message:"Internal server error"
        })
    }
}

const updateUser=async(req,res)=>{
    try{
        const {uNo,pNo,cn,cn2,sex}=req.body;
        const user =await users.findOne({email:currentUser.email})
        if (!user){
            return res.status(error.status.BadRequest).json({
                message:"User not found",
                code:400
            })
        }
        const update=await users.updateOne({email:user.email},
            {$set:{identity:{AdharNo:uNo,PanNo:pNo,Gender:sex,courses:{course_01:{course_name:cn,date:Date.now()
        },course_02:{course_name:cn2,date:Date.now()}}}}})
       
        let views=await users.findOne({email:user.email})
        return res.status(error.status.OK).json({
            message:'successfull update',
            code:200,
            data:views
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            message:"Internal server error",
            code:500
        })
    }
}
module.exports={UserSignUp,userLogIn,userLogOut,changePassword,setPassword,updateUser}