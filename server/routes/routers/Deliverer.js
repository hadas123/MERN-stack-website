var express=require('express');
var router=express.Router();
const bodyParser=require('body-parser');
var jsonParser=bodyParser.json();
var path = require('path');

const {getDelivererOrders, getUserOrder,updateOrderByDeliver}=require("../../APIS/Orders");

router.get('/orders/getOrders/:deliverId',getDelivererOrders);
router.get('/orders/getOrder/:orderId',getUserOrder);
router.post('/orders/updateOrder',updateOrderByDeliver);//status, תאריך הגעה
module.exports=router;
