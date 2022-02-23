const Order=require('../routes/Models/Orders');
const User=require('../routes/Models/User');
const mongoose=require('mongoose');
const Kmeans=require('./Kmeans');
const {getPosition} =require('./location');

////
//get ordrer
////
function getAllOrders(req,res){ 
    Order.find().exec().then((ordersList)=>{res.json({orders:ordersList});})
}
function getDelivererOrders(req,res){
    Order.find({deliverId:req.params.deliverId}).exec().then((ordersList)=>{res.json({"orders":ordersList});})       
}

function getCustomerOrders(req,res){
    Order.find({customerId:req.params.customerId}).exec().then((ordersList)=>{res.send(ordersList);})       
}

//can be orders of deliverer or customer depenes on rhe request
function getUserOrder(req,res){
    Order.findOne({_id:req.params.orderId}).exec().then((_order)=>{
        if(_order)
            res.status(200).json({order:_order});
        else
            res.status(400).json({error:"order does not exist"})        
        })       
}

////
//add
////
async function addOrderByCustomer(req,res){
    try{
         orderId=mongoose.Types.ObjectId();
         User.findOne({_id:req.body.customerId,active:true}).exec().then(customerToAddOrder=>{    
            if(customerToAddOrder){
                 User.updateOne({_id:req.body.customerId},{$set:{orderIdList:customerToAddOrder.orderIdList+[orderId]}})
                 .then(()=>{
                     getPosition(req.body.address).then((location)=>{ 
                         let order=new Order({
                             _id:orderId,
                             productList:req.body.productList,
                             status: 'new',
                             customerId:req.body.customerId,
                             deliverId:undefined,
                             creationDate:Date.now(),
                             ExpectedDeliverDate:undefined,
                             DeliverDate:undefined,
                             address:{
                                 city:req.body.address.city,
                                 street:req.body.address.street,
                                 building:req.body.address.building,
                                 },
                             position:{
                                 lat: String(location.lat),
                                 lng: String(location.lng)   
                             }
                          
                         })  
                         order.save().then(res.sendStatus(200)); 
                     }).catch((_err)=>{res.status(400).json({err:_err})}); 
                 });
             } else  res.status(400).json({error:"cannot update. customer does not exist"});
     
         });
 
 
        
     }catch(_error){res.status(500).json({error:_error});}
 
 }

////
//update
////
function updateOrderByCustomer(req,res){ 
    Order.findOne({_id:req.body.orderNumber}).exec().then(orderToUpdate=>{
        if(orderToUpdate){
            if (orderToUpdate.status=="new")
            { getPosition(req.body.address).then((location)=>{ 
            Order.updateOne({_id:req.body.orderNumber},{$set:{productList:req.body.productList, address:{
                city:req.body.address.city,
                street:req.body.address.street,
                building:req.body.address.building,
                },
            position:{
                lat: String(location.lat),
                lng: String(location.lng)   
            }}})
            .then(()=>{res.sendStatus(200);});
            });
            }

       
            else  res.status(400).json({error:"cannot update. request already in progess or being delivered"});   
        } else  res.status(400).json({error:"cannot update. not found order"});
    });
}
//only admnistritor can do it
function setDlivererToOrder(req,res){
    Order.findOne({_id:req.body.orderNumber}).exec().then(orderToUpdate=>{
           User.findOne({_id:req.body.deliverId,active:true}).exec().then(DeliverToUpdate=>{
           if(orderToUpdate && DeliverToUpdate){                               
               if ((orderToUpdate.status!="delivered") &&((Date.parse(req.body.ExpectedDeliverDate)>Date.now())))
                 { 
                     User.updateOne(
                         {_id:req.body.deliverId, active:true},
                         {$set:{
                             orderIdList:DeliverToUpdate.orderIdList+[req.body.orderNumber]}
                     }).then(()=>{
                         Order.updateOne(
                             {_id:req.body.orderNumber},
                             {$set:{ExpectedDeliverDate:req.body.ExpectedDeliverDate,deliverId:req.body.deliverId,status:"in progress"}
                         }).then(()=>{res.sendStatus(200);});

                     });
               }
          
               else  res.status(400).json({error:"cannot set dlivererer to order.cheack if request already delivered or if expected delivery date already pass"});   
           } else  res.status(400).json({error:"cannot set dlivererer to order. not found order or dliverer"});
       });
    });
}
function updateOrderByDeliver(req,res){ 
    Order.findOne({_id:req.body._id}).exec().then(orderToUpdate=>{
        if(orderToUpdate){
            if (orderToUpdate.status=="in progress")
            {
            Order.updateOne({_id:req.body._id},{$set:{status:"delivered", DeliverDate:Date.now()}})
            .then(()=>{res.sendStatus(200);});
            }      
            else  res.status(400).json({error:"cannot update. order is new or already been delivered"});   
        } else  res.status(400).json({error:"cannot update. order does not exist."});
    });
}

function getOfferedDistributionWithDeliverers(req,res){
    if(req.body.orders.length===0)res.json({proposal:[]});
    else{ if(req.body.deliverers.length===0)res.json({proposal:[]});
    else{
        if(req.body.deliverers.length>req.body.orders.length)req.body.deliverers=req.body.deliverers.slice(0,req.body.orders.length);
        if((req.body.deliverers.length!==0)&&(req.body.orders.length!==0))
        Kmeans.distributeOrdersToDeliverers(req.body.orders,req.body.deliverers,(_res)=>{
            res.json({proposal:_res});
        });
  }}
    
}

function setDistributionWithDeliverers(req,res){
    if(req.body.orders.length===0)res.sendStatus(403);
    else{if(req.body.deliverers.length===0)res.sendStatus(403);
        else{
        if(req.body.deliverers.length>req.body.orders.length)req.body.deliverers=req.body.deliverers.slice(0,req.body.orders.length);
        if((req.body.deliverers.length!==0)&&(req.body.orders.length!==0))
        Kmeans.distributeOrdersToDeliverers(req.body.orders,req.body.deliverers,(_res)=>{
            let count=0;
            _res.forEach(element => {
                Order.updateOne(
                    {_id:element.order._id},
                    {$set:
                        {
                            deliverId:element.order.deliverId,
                            status:['in progress'],   
                            ExpectedDeliverDate:new Date(req.body.date)
                        }
                    }).then(()=>{
                    count=count+1;
                    if(count===_res.length)res.sendStatus(200);
                });
            });
        });
    }}
}
function getOfferedDistributionWithDeliverersUserName(req,res){}
function setDistributionWithDeliverersUserName(req,res){}

////
//delete 
///
function deleteOrderByCustomer(req,res){
    User.findOne({_id:req.params.customerId,active:true}).exec().then(customerToAddOrder=>{    
        if(customerToAddOrder){
            User.updateOne({_id:req.params.customerId},{$set:{orderIdList: customerToAddOrder.orderIdList.filter((id)=>{id!=req.body.customerId})}})
            .then(()=>{ 
                Order.findOne({_id:req.params.orderNumber,customerId:req.params.customerId}).exec()
                .then(orderToDelete=>{
                    if(orderToDelete){
                        if (orderToDelete.status=="new")
                        {
                            Order.deleteOne({_id:req.params.orderNumber})
                            .then(()=>{res.sendStatus(200); });
                            
                        }   
                        else  res.status(400).json({error:"cannot delete. request already in progess or being delivered"});           
                }else res.status(400).json({error:"cannot delete. not found order"}); 
                });
                

            });
        } else  res.status(400).json({error:"cannot delete. customer does not exist"});

    });
   
}


module.exports={getAllOrders,getCustomerOrders,getDelivererOrders,getUserOrder,addOrderByCustomer,updateOrderByCustomer,setDlivererToOrder,updateOrderByDeliver,deleteOrderByCustomer,getOfferedDistributionWithDeliverers,setDistributionWithDeliverers,getOfferedDistributionWithDeliverersUserName,setDistributionWithDeliverersUserName}