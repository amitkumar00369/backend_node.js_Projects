const jwt = require("jsonwebtoken");
const USER = require("../models/userModel");
const Token=require('../models/tokenModel')

const validateToken = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    // let token=req.header('Authorization').replace('Bearer ', '');
    if (!token) {
      return res.status(400).json({
        code: 400,
        message: "Token is required",
      });
    }

    const tokenfind=await Token.findOne({token:token});
    if(!tokenfind){
      return res.status(400).json({
        code: 400,
        message: "Please login",
      });

    }

    let decode = jwt.verify(token, process.env.SECRET);
    if (!decode) {
      return res.status(400).json({
        code: 400,
        message: "Token is not verified",
      });
    }
    // console.log(decode);
    // -----------------------------

    let userData = await USER.findOne({ _id: decode.userId,});
    // console.log(userData)
    if (!userData) {
      return res.status(400).json({
        code: 400,
        message: "No user found with this token..",
      });
    } else {
      currentUser = userData;
      // console.log('req',currentUser)
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      message: "catch error",
    });
  }
};

module.exports = validateToken;
