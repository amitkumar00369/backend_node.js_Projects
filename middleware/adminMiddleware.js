const jwt=require('jsonwebtoken')
const TOKEN=require('../models/adminTokenTable')
require('dotenv').config()
const error=require('../utils/errors')
const ADMIN=require('../models/admin.model')

const validateToken=async(req,res,next)=>{
    try{
        const token=req.headers['authorization']
        if (!token){
            return res.status(error.status.BadRequest).json({
                message:"Please enter token in headers column type Authorization",
                code:400
            })
        }
        const find=await TOKEN.findOne({token:token})
        if (!find){
            return res.status(error.status.NotFound).json({
                message:"Please login!........Token not found",
                code:404
            })
        }
        const decode=await jwt.verify(token,process.env.SECRET)
        let adminId=decode['id']
        const admin=await ADMIN.findOne({_id:adminId})
        if (!admin){
            return res.status(error.status.NotFound).json({
                message:"Admin not found",
                code:404
            })
        }

        currentUser = admin;
        console.log('asdfgergwert',currentUser)
        next();
        



    }
    catch(error){
        return res.status(500).json({
            message:'internal server error',
            code:500
        })
    }
}
module.exports=validateToken;