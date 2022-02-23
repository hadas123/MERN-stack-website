const Product = require('../routes/Models/Product');
const mongoose=require('mongoose');


////
//get
////
function getProducts(req,res){
    Product.find({active:true}).exec().then((productsList)=>{res.json({products:productsList});})       
}

function getProductById(req,res){
    Product.findOne({_id:req.params.productCode,active:true}).exec().then((product)=>{
        if(product)
            res.status(200).json({product:_product});
        else res.status(400).json({error:"product does not exist"})
        });     
}

function getProductByName(req,res){
    Product.findOne({name:req.params.productName,active:true}).exec().then((product)=>{
        if(product)
            res.status(200).json({product:_product});
        else res.status(400).json({error:"product does not exist"})
        });     
}

////
//add
////
function addProductByAdministrator(req, res){
    let product=new Product({
        _id:mongoose.Types.ObjectId(),
        active:true,
        name:req.body.name,
        urlImage:req.body.urlImage
    });
    product.save().then(res.sendStatus(200));
}

////
//update
////
function updateProductByCodeByAdministrator(req,res){ 
    Product.findOne({_id:req.body.productCode,active:true}).exec().then(productToUpdate=>{
        if(productToUpdate){
            Product.updateOne({_id:req.body.productCode},{$set:{name:req.body.name, urlImage:req.body.urlImage}})
            .then(()=>{res.sendStatus(200);});       
        } else  res.status(400).json({error:"cannot update. product does not exist"});
    });
}
function updateProductByNameByAdministrator(req,res){ 
    Product.findOne({name:req.body.name,active:true}).exec().then(productToUpdate=>{
        if(productToUpdate){
            Product.updateOne({name:req.body.name},{$set:{name:req.body.name, urlImage:req.body.urlImage}})
            .then(()=>{res.sendStatus(200);});       
        } else  res.status(400).json({error:"cannot update. product does not exist"});
    });
}

////
//delete
////
function deleteProductByAdministrator(req,res){
    Product.findOne({_id:req.params.productCode,active:true}).exec().then(productToDelete=>{
        if(productToDelete){
            Product.updateOne({_id:req.params.productCode},{$set:{active:false}}).then(()=>{res.sendStatus(200);});
        }else res.status(400).json({error:"cannot delete. product doesnt exist"}); 
    });
    
}

module.exports={getProducts,getProductById,getProductByName,addProductByAdministrator,updateProductByCodeByAdministrator,updateProductByNameByAdministrator,deleteProductByAdministrator}