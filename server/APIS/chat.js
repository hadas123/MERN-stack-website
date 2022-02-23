const config=require('../config');
var axios = require('axios');

function getUserChat(userId,userName,email,firstName,lastName){
    var data = {
        "username":userName,
        "secret": userId,
        "email": email,
        "first_name": firstName,
        "last_name": lastName,
    };

    let configUser = {
        method: 'post',
        url: 'https://api.chatengine.io/users/',
        headers: {
            'PRIVATE-KEY': `${config.env.CHAT_KEY}`
        },
        data : data
    };

    axios(configUser)
    .then(function (response) {
	    console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
	    console.log(error);
    });
}


function deleteUserChat(user_id){
    let deleteUser = {
        method: 'delete',
        url: 'https://api.chatengine.io/users/'`${user_id}`+'/',
        headers: {
            'PRIVATE-KEY': `${config.env.CHAT_KEY}`
        },
    };

    axios(deleteUser)
    .then(function (response) {
	    console.log(response.data);
    })
    .catch(function (error) {
	    console.log(error);
    });
}


function getChatWithAdmin(userId,userName){

    let configChat = {
        method: 'post',
        url: 'https://api.chatengine.io/projects/13df7729-7309-421c-98c6-331ce84f065a/chats/',
        headers: {
            // "Project-ID":`${config.env.CHAT_PROJECT_ID}`,
            // "User-Name":userName,
            // "User-Secret":userId
        },
        body:{
            "title": "chat with admin",
            "is_direct_chat": false,
        }       
    };

    axios(configChat)
    .then(function (response) {
	    console.log(response.data);
    })
    .catch(function (error) {
	    console.log(error);
    });
}

module.exports={getUserChat};

