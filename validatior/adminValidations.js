const { body, param, check } = require("express-validator");
const admin = require("../models/admin.model");

const adminValidationForRegister=[
    check("email").notEmpty().withMessage("email is required").custom((value) => {
        if (!value.includes("@") || !value.includes(".") || !value.includes("gmail")) {
          throw new Error("Invalid email");
        }
        return true;
      }),
    check('password').notEmpty().withMessage('please enter password')
];
const adminValidationForLogin=[
    check("email").notEmpty().withMessage("email is required").custom((value) => {
        if (!value.includes("@") || !value.includes(".") || !value.includes("gmail")) {
          throw new Error("Invalid email");
        }
        return true;
      }),
    check('password').notEmpty().withMessage('please enter password')
];
const adminValidationForgetPassword=[
    check("email").notEmpty().withMessage("email is required").custom((value) => {
        if (!value.includes("@") || !value.includes(".") || !value.includes("gmail")) {
          throw new Error("Invalid email");
        }
        return true;
      }),

    check('newPassword').notEmpty().withMessage('please enter new password')
];
 const adminChangePassword=[
    check('oldPassword').notEmpty().withMessage('please enter old password'),
    check('newPassword').notEmpty().withMessage('please enter net password')
 ]

module.exports={adminValidationForRegister,adminValidationForLogin,adminValidationForgetPassword,adminChangePassword}