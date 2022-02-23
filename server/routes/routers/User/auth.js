var express=require('express');
var router=express.Router();
const bodyParser=require('body-parser');
var jsonParser=bodyParser.json();
var path = require('path');
//const {upload}=require('../../../multerConfig');
const {saveFile}=require('../../../APIS/image');

const {googleLogIn,googleRegister,JWTLogIn,JWTRegister,logout,SendRestCode,ResetPassword,isLogedIn}=require('../../../APIS/auth');



router.post('/google/login',googleLogIn);
router.post('/google/register',googleRegister);
router.post('/server/login',JWTLogIn);
router.post('/server/register',JWTRegister,saveFile);
router.get('/logout',logout);
router.post('/SendMeResetCode/:email',SendRestCode);
router.post('/ResetPassword',ResetPassword);
router.get('/isLogedIn',isLogedIn);
module.exports=router;