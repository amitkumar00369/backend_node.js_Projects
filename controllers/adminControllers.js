const ADMIN=require('../models/admin.model')
const error=require('../utils/errors')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const TOKEN=require('../models/adminTokenTable')

const adminRegister=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const find=await ADMIN.findOne({email:email})
        const hashPass=await bcrypt.hash(password,10)

        if (find){
            return res.status(error.status.alreadyExist).json({
                message:"admin already exist",
                code:409
            })
        }
        const admin=await ADMIN.create({email:email,password:hashPass})
        return res.status(error.status.OK).json({
            message:'Admin registered Successfully',
            adminEmail:email,
            password:password,
            code:200
        })

    }
    catch(error){
        return res.status(500).json({
            message:"Internal server error",
            code:500
        })
    }

}

const adminLogin=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const find=await ADMIN.findOne({email:email})
        if(!find){
            return res.status(error.status.NotFound).json({
                message:"Admin not found",
                code:404
            })
        }
        const compPass=await bcrypt.compare(password,find.password)
        if(!compPass){
            return res.status(error.status.BadRequest).json({
                message:"please enter correct password",
                code:400
            })

        }
        const token=await jwt.sign({id:find._id},process.env.SECRET)
        if(!token){
            return res.status(error.status.BadRequest).json({
                message:"token has not generated",
                code:400
            })

        }
        const findToken=await TOKEN.findOne({email:email})
        if(!findToken){
            await TOKEN.create({token:token,email:email})
        }
        else{
            await TOKEN.create({token:token,email:email})
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
        const ip_address = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        // Save device type and IP address in the user model
        find.deviceType = deviceType;
        find.ipAddress = ip_address;
        await find.save();

        return res.status(error.status.OK).json({
            message:'admin Login Successfully',
            adminEmail:email,
            adminPassword:password,
            deviceType:find.deviceType,
            ipAddress:find.ipAddress,
            adminToken:token,
            
            code:200
        })



    }
    catch(error){
        return res.status(500).json({
            message:"Internal server error",
            code:200
        })
    }
}

const adminLogout=async(req,res)=>{
    try{
        const find=await ADMIN.findOne({email:currentUser.email})
     
       
      
        if(!find){
            return res.status(error.status.NotFound).json({
                message:"Admin not found",
                code:404
            })
        }
        const tokenfind=await TOKEN.findOne({email:currentUser.email})
       
        if(!tokenfind){
            return res.status(error.status.NotFound).json({
                message:"Admin not found in token table",
                code:404
            })
        

        }

        await TOKEN.deleteMany({email:currentUser.email})
  
        return res.status(error.status.OK).json({
            message:"Admin logout successfully",
            adminEmail:currentUser.email,
            code:200
        })
        
        


    }
    catch(error){
        return res.status(500).json({
            message:"Internal server error",
            code:200
        })
    }
}

const forgetPassword=async(req,res)=>{
    try{
        const {email,newPassword}=req.body;
        const find=await ADMIN.findOne({email:email})
        if(!find){
            return res.status(error.status.NotFound).json({
                message:"Admin not found",
                code:404
            })

        }
        const hashPass=await bcrypt.hash(newPassword,10)
        find.password=hashPass;
        find.save()
        return res.status(error.status.OK).json({
            message:"Admin set new password successfully ",
            email:find.email,
            adminPassword:newPassword,
            code:200

        })

    }
      catch(error){
        return res.status(500).json({
            message:"Internal server error",
            code:200
        })
    }

}
const changePassword=async(req,res)=>{
    try{
        const {oldPassword,newPassword}=req.body;
        const find=await ADMIN.findOne({email:currentUser.email})
        if (!find){
            return res.status(error.status.NotFound).json({
                message:"Admin not found",
                code:404
            })
        }
        const verifyPassword=await bcrypt.compare(oldPassword,find.password)
        if (!verifyPassword){
            return res.status(error.status.Unauthorized).json({
                message:"please enter correct oldPassword",
                code:401
            })
        }
        const hashPass=await bcrypt.hash(newPassword,10)
        find.password=hashPass
        find.save()

        return res.status(error.status.OK).json({
            message:'Admin change password successfully',
            adminEmail:find.email,
            adminNewPassword:newPassword,
            code:200
        })
 

    }
    catch(error){
        return res.status(500).json({
            message:"Internal server error",
            code:200
        })
    }
}
module.exports={adminRegister,adminLogin,adminLogout,forgetPassword,changePassword}