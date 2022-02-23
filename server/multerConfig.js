const multer  = require('multer');
const path=require('path');
const storage = multer.diskStorage({
    destination:
    (req, file, cb)=>{
        console.log('try');
       cb(null,path.resolve(__dirname,'public/images/'))
    },
    filename: function (req, file, cb) {
      cb(null, file.originalFilename)
    }
  });
  
  const upload = multer({ storage: storage }).single('image');



  
  module.exports={upload};