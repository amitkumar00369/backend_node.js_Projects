const express=require('express')
const message=require('../middleware/errorMiddleware')
const validator=require('../validatior/adminValidations')
const controllers=require('../controllers/adminControllers')
const auth=require('../middleware/adminMiddleware')



router=express.Router();
router.post('/adminSignup',validator.adminValidationForRegister,message.errorResponse,controllers.adminRegister)
router.post('/adminLogin',validator.adminValidationForLogin,message.errorResponse,controllers.adminLogin)
router.post('/adminLogout',auth,message.errorResponse,controllers.adminLogout)
router.patch('/adminForgetPassword',validator.adminValidationForgetPassword,message.errorResponse,controllers.forgetPassword)
router.patch('/adminChangePassword',auth,validator.adminChangePassword,message.errorResponse,controllers.changePassword)
module.exports=router
