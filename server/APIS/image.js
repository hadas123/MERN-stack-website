const fs=require('fs');

function saveFile(req,res,next) {  
    if(req.files){if(req.files.image){
        let img=fs.createReadStream(req.files.image.path);
        let path=(__dirname+'./../public/images/users/');
        img.pipe(fs.createWriteStream((path+(res.locals.userId)+".jpg")));
    }}
    if(res.locals.IsAddDoesntHaveImage){
        console.log(res.locals.userId)
        let img=fs.createReadStream(__dirname+'./../public/images/users/userTemplate.jpg');
        let path=(__dirname+'./../public/images/users/');
        img.pipe(fs.createWriteStream((path+(res.locals.userId)+".jpg")));
    }
    res.sendStatus(200);       
}
    
module.exports={saveFile};