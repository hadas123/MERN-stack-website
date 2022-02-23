const kmeans = require('node-kmeans');


function convertToArray(orders){ 
    let vectors = new Array();
    for (let i = 0 ; i < orders.length ; i++) {
        vectors[i] = [ parseFloat(orders[i].position['lat']) , parseFloat(orders[i].position['lng'])];
    }
    return vectors;
}


function getDelivererWithOrders(orders,deliverers,res){
    OrdersWithDeliverer=new Array();
    let index1=0;
    let index2=0;
    res.forEach(i => {
      (i.clusterInd).forEach(j => {
        orders[j].deliverId=deliverers[index1]._id;
        OrdersWithDeliverer[index2]={order:orders[j],deliverer:deliverers[index1]}
        index2++;
      });
      index1++;
    });
    
    return OrdersWithDeliverer;
  }

function distributeOrdersToDeliverers(orders,deliverers,callback){
    
    kmeans.clusterize(convertToArray(orders), {k: deliverers.length}, (err,res) => {
        callback( getDelivererWithOrders(orders,deliverers,res));    
      });

}
module.exports={distributeOrdersToDeliverers};
