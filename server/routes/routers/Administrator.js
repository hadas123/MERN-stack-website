var express=require('express');
var router=express.Router();
const bodyParser=require('body-parser');
var jsonParser=bodyParser.json();
var path = require('path');
const {saveFile}=require('../../APIS/image');

const {setDlivererToOrder,getAllOrders,getCustomerOrders,getDelivererOrders,getUserOrder,
    addOrderByCustomer,updateOrderByDeliver,
    updateOrderByCustomer,deleteOrderByCustomer,
    getOfferedDistributionWithDeliverers,setDistributionWithDeliverers,
    getOfferedDistributionWithDeliverersUserName,setDistributionWithDeliverersUserName}=require("../../APIS/Orders");


router.get('/orders/getAllOrders',getAllOrders);//V
router.post('/orders/setDlivererToOrder',setDlivererToOrder);//body should contain:deliverId,orderNumber,expectedDate
router.post('/orders/getOfferedDistributionWithDeliverers',getOfferedDistributionWithDeliverers);//body:list of ordersids and dliverers ids
//router.get('/orders/getOfferedDistributionWithDeliverersUserName',getOfferedDistributionWithDeliverersUserName);
router.post('/orders/setDistributionWithDeliverers',setDistributionWithDeliverers);//body:list of ordersids and dliverers ids
//router.get('/orders/setDistributionWithDeliverersUserName',setDistributionWithDeliverersUserName);
router.post('/orders/addOrder',addOrderByCustomer);



router.get('/orders/getCustomerOrders/:customerId',getCustomerOrders);
router.post('/orders/addOrder',addOrderByCustomer);
router.get('/orders/getOrder/:orderId',getUserOrder);
router.post('/orders/updateProductsOrder',updateOrderByCustomer);
router.delete('/orders/deleteOrder/:customerId/:orderNumber',deleteOrderByCustomer);

router.get('/orders/getDelivererOrders/:delivererId',getDelivererOrders);
router.post('/orders/updateOrderArival',updateOrderByDeliver);



const {getProducts,getProductById,getProductByName,addProductByAdministrator,updateProductByCodeByAdministrator,updateProductByNameByAdministrator,deleteProductByAdministrator}=require('../../APIS/Products');

//get only the actives
router.get('/products/getProducts',getProducts);//V
router.get('/products/getProductById/:productCode',getProductById);//V
router.get('/products/getProductByName/:productName',getProductByName);//V
router.post('/products/addProduct',addProductByAdministrator);//body:url,name //V
router.post('/products/updateProductByCode',updateProductByCodeByAdministrator);//body:productCode,url,name//V
router.post('/products/updateProductByName',updateProductByNameByAdministrator);//V
//change to not active
router.delete('/products/deleteProduct/:productCode',deleteProductByAdministrator);//V


const {AddUser,getAllUsers,getCustomers,getDeliverers,addCustomerByAdmnistrtor,addDelivererByAdmnistrtor,updateUserByAdmnistrtor,deleteUser}=require("../../APIS/Users");

//get only the actives
router.get('/users/getAllUsers',getAllUsers);
router.get('/users/getCustomers',getCustomers);
router.get('/users/getDeliverers',getDeliverers);
router.post('/users/AddUser',AddUser,saveFile);
// router.post('/users/addCustomer',addCustomerByAdmnistrtor);//userName,firstname,lastname,email,phone,urlImage,address(city,street,building)
// router.post('/users/addDeliverer',addDelivererByAdmnistrtor);//same
//can update userName,firstname,lastname,email,phone,urlImage,address(city,street,building)
router.post('/users/updateUser',updateUserByAdmnistrtor);
//allow to delete only if there non active orders. not really deleted change state to not active
router.delete('/users/deleteUser/:userId',deleteUser);


module.exports=router;