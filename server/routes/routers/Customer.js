var express=require('express');
var router=express.Router();
const bodyParser=require('body-parser');
var jsonParser=bodyParser.json();
var path = require('path');

const {getCustomerOrders,getUserOrder,addOrderByCustomer,updateOrderByCustomer,deleteOrderByCustomer}=require("../../APIS/Orders")
router.get('/orders/getOrders/:customerId',getCustomerOrders);//V
router.get('/orders/getOrder/:customerId/:orderId',getUserOrder);
router.post('/orders/addOrder',addOrderByCustomer);//body:customerId,productList,address//V
router.post('/orders/updateOrder',updateOrderByCustomer);//body:orderNumbr,productList, address//V
router.delete('/orders/deleteOrder/:customerId/:orderNumber',deleteOrderByCustomer);//V

const {getProducts,getProductById,getProductByName}=require('../../APIS/Products');
router.get('/products/getProducts',getProducts);//V
router.get('/products/getProductById/:productCode',getProductById);//V
router.get('/products/getProductByName/:productName',getProductByName);//V

module.exports=router;