const config=require('../config');
const https = require('https');

function AdressToString(Address){
    street=Address.street.replace(" ","%20");
    city=Address.city.replace(" ","%20");
    uri=street+"%20"+Address.building+"%20"+city+"%20Israel";
    return uri;
}
async function getPosition(address){
    return new Promise((resolve,reject)=>{
        https.get(`https://us1.locationiq.com/v1/search.php?key=${config.env.LOCATIONIQ_ACCESS_TOKEN}&q=${AdressToString(address)}&format=json`,
        (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                let location = JSON.parse(data);
                try{location[0]}
                catch{
                    throw new Error("cannot find that address");
                };
                resolve(  {lat: location[0].lat,lng: location[0].lon } );
            });
        });
    });

}

module.exports={getPosition};