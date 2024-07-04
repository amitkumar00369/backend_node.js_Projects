const express =require('express')

const router=express.Router()

const {UserSignUp,userLogIn,userLogOut,changePassword,setPassword,updateUser}=require('../controllers/userControllers')
const validator=require('../validatior/userValidations.js')
const message=require('../middleware/errorMiddleware')
const auth=require('../middleware/authMiddleware')


router.post('/usersignup',validator.userSignUp,message.errorResponse,UserSignUp)
router.post('/userLogIn',validator.UsersLogin,message.errorResponse,userLogIn)
router.post('/logout',
    auth,
    message.errorResponse,
    userLogOut)
router.put('/changePassword',auth,validator.usersChangePassword,message.errorResponse,changePassword)
router.put('/setPassword',auth,validator.setpassword,message.errorResponse,setPassword)
router.put('/updateUser',auth,validator.userUpdate,message.errorResponse,updateUser)
module.exports=router