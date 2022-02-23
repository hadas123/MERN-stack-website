var express=require('express');
var router=express.Router();
const bodyParser=require('body-parser');
var jsonParser=bodyParser.json();
var path = require('path');

const {AddPost,GetPosts}=require("../../../APIS/Blog");

router.get('/viwe',GetPosts);
router.post('/addPost',AddPost);


module.exports=router;