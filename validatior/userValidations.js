const users = require("../models/userModel");
const error = require("../utils/errors");
const { body, param, check } = require("express-validator");



const userSignUp=[  
    check("name").notEmpty().withMessage("first name is required"),
    check("mobileNo").notEmpty().withMessage("last name is required"),
    check("password").notEmpty().withMessage("password is required"),
    check("country").notEmpty().withMessage("password is required"),
    check("email").notEmpty().withMessage("email is required").custom((value) => {
        if (!value.includes("@") || !value.includes(".") || !value.includes("gmail")) {
          throw new Error("ache se likho");
        }
        return true;
      }),
  
  

  ];

const UsersLogin = [
    // check("password").notEmpty().withMessage("password is required"),
    check("email").notEmpty().withMessage("email is required").custom((value) => {
        if (!value.includes("@") || !value.includes(".") || !value.includes("gmail")) {
          throw new Error("ache se likho");
        }
        return true;
      }),
  
    check("password").notEmpty().withMessage("password is required"),
  ];
  
const usersChangePassword = [
    check("oldPassword").notEmpty().withMessage("old password is required"),
    check("newPassword").notEmpty().withMessage("new password is required"),
  ];
const setpassword = [
    check("password").notEmpty().withMessage("password is required"),
    
  ];

const userUpdate=[

  check("uNo").notEmpty().withMessage("adhar number is required"),
  check("pNo").notEmpty().withMessage("pan number is required"),
  check("sex").notEmpty().withMessage("Gender  is required"),
  check("cn").notEmpty().withMessage("course name is required"),
  check("cn2").notEmpty().withMessage("cousre name 2 is required"),
]
  
  
  module.exports = { userSignUp, setpassword,UsersLogin, usersChangePassword ,userUpdate};


