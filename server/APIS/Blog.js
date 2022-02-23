const Blog=require('../routes/Models/Blog');
const mongoose=require('mongoose');


function GetPosts(req,res) {
    Blog.find().exec().then((posts)=>{res.json({posts:posts});})
}

function AddPost(req,res) {
    let post=new Blog({
        _id:mongoose.Types.ObjectId(),
        creationDate:Date.now(),
        title:req.body.title,
        content:req.body.content  
    })  
    post.save().then(res.sendStatus(200)); 
}

module.exports={GetPosts,AddPost}