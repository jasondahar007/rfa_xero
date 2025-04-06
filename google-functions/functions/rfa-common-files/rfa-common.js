//
//
//
//const request = require('request-promise');

// RFA Codes
//const RFA_SECRET      = 'wR47Q~RKVNDxJJnDWMN5Nyk5QJ.xnspB0ihRX';        
//const RFA_CLIENTID    = '7b57110e-3dc8-4c4b-b09d-32cbc695c543';
//const RFA_SCOPE       = 'd76c73c9-ff6e-4214-b894-1ba94eaa5110/.default';
//const RFA_URL         = 'https://login.microsoftonline.com/fbfaf324-3a1f-4584-a1e0-665383636ab2/oauth2/v2.0/token';
//const RFA_GRAPHQL_URL = 'https://azp-primary-api.azurewebsites.net/graphql';    

/****************************************************************************************************************************************************************/

//'headers' : { 'Accept' : '*/*' },
/*
function rfa_get_access_token() {

    return new Promise(resolve => {
        var options = {
            'method'  : 'POST', 'url' : RFA_URL,
            body      : 'grant_type=client_credentials&client_secret=' + RFA_SECRET + '&client_id=' + RFA_CLIENTID + '\n&scope=' + RFA_SCOPE 
        };
        request(options, (error, response, body) => { 
            if (error) throw new Error(error);
            const data = JSON.parse(body);
            if (data.access_token) resolve(data.access_token);
            else resolve("ERROR");
        });
    });
}
*/
/****************************************************************************************************************************************************************/

function setResponseHeaders(res) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
}
/****************************************************************************************************************************************************************/

module.exports = {
    //rfa_get_access_token,
    setResponseHeaders
   
};

