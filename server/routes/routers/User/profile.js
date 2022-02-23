var express=require('express');
var router=express.Router();
const bodyParser=require('body-parser');
var jsonParser=bodyParser.json();
var path = require('path');
const {saveFile} =require('../../../APIS/image');

const {getProfile,updateProfile}=require("../../../APIS/Profile");

router.get('/getProfile/:userId',getProfile);
router.post('/updateProfile',updateProfile,saveFile);

// router.post('/sendResetCode',sendResetCode);
// router.post('/updatePassword',updatePassword);//body:email,resetCode,newPassword


module.exports=router;