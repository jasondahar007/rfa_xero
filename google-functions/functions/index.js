//
// This comment will fix problem of no wait in loop DO NOT REMOVE
/* eslint-disable */
//
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const runtimeOpts128 = { timeoutSeconds: 540, memory: '128MB' }
const runtimeOpts256 = { timeoutSeconds: 540, memory: '256MB' }

var moment = require('moment');                                 
const request = require('request-promise');

const nodemailer          = require('nodemailer');  
const SEND_EMAIL          = "toradigital007@gmail.com";
const SEND_EMAIL_PASSWORD = "ijyygabusrdgzebr";
let transporter = nodemailer.createTransport({ service : 'gmail', auth : { user: SEND_EMAIL, pass: SEND_EMAIL_PASSWORD } });
const RECEIVE_EMAIL = "jason.dahar@redflagalert.com";

const RECEIVE_EMAIL_RFA = "jason.dahar@redflagalert.com,support@redflagalert.com";

// RFA Codes
const XERO_FB_TABLE      = "XERO_account";
const XERO_FB_USER       = "XERO_user";
const XERO_CREDITCOUNTER = 0;
const XERO_CREDITLIMIT   = 0;

// 04/03/2025
//const XERO_PLAN_BRONZE   = 10;
//const XERO_PLAN_SILVER   = 25;
//const XERO_PLAN_GOLD     = 50;
const XERO_PLAN_BRONZE   = 5;
const XERO_PLAN_SILVER   = 15;
const XERO_PLAN_GOLD     = 30;
// 04/03/2025

const XERO_PLAN_TEST     = 100;
const XERO_PLAN_NAME_BRONZE = "Bronze";
const XERO_PLAN_NAME_SILVER = "Silver";
const XERO_PLAN_NAME_GOLD   = "Gold";
const XERO_PLAN_STATUS_ACTIVE = "ACTIVE";
const XERO_PLAN_NAME_TEST     = "Test"; // TBC

const fs        = require('fs');
const axios     = require("axios");
const crypto    = require('crypto');
const path      = require("path");
const os        = require("os");

// Xero API constants
const XERO_TOKEN_URL       = 'https://identity.xero.com/connect/token';
const XERO_API_URL         = 'https://api.xero.com/api.xro/2.0';
const XERO_PM_API_URL      = "https://api.xero.com/practicemanager/3.1/";
const XERO_CLIENT_ID       = "94D1CFBA89EB40328EE3DA3FBC1B0B01";
const XERO_CLIENT_SECRET   = "rn_UoLmiedMMwX53nA1OLkw1g5qrxANStZQ-a2JQMzbyDjdr";
const XERO_CLIENT_REDIRECT = "https://europe-west1-redflag-live.cloudfunctions.net/XERO_oauth";

const RFA_API_KEY         = "Ju41sjvJbSFVb9c7tFqbRoCczA6WgrSyhuJfaCQ7TOUKXY04IGHcyCHKVnHyaT7o";

// LIVE
//const RFA_CREATE_USER_URL = "https://account-dev.redflagalert.net/api/external-create-user/"; 
//const RFA_GRAPHQL_URL     = "https://az-dev-primary-api.azurewebsites.net/graphql/";
//const RFA_GRAPHQL_URL_DEV = "https://az-dev-primary-api.azurewebsites.net/graphql/";
//const RFA_CREATE_USER_URL_DEV = "https://account-dev.redflagalert.net/api/external-create-user/";
//const RFA_AML_API_KEY_DEV     = "d6438e8a-2455-4338-a048-3940df38dc43";
//const RFA_ACCOUNT_ID_DEV      = "RF12421";

const RFA_GRAPHQL_URL     = 'https://azp-primary-api.azurewebsites.net/graphql';    
const RFA_CREATE_USER_URL = "https://account.redflagalert.net/api/external-create-user/";
const RFA_AML_API_KEY     = "d6438e8a-2455-4338-a048-3940df38dc43";
const RFA_ACCOUNT_ID      = "RF100770";

const AML_RESULT_AWAITING  = "AWAITING";
const AML_RESULT_CONSIDER  = "CONSIDER";
const AML_RESULT_PASSED    = "PASSED";
const AML_RESULT_FAILED    = "FAILED";
const AML_STATUS_CREATED   = "CREATED";
const AML_STATUS_REQUESTED = "REQUESTED";
const AML_STATUS_STARTED   = "STARTED";
const AML_STATUS_COMPLETED = "COMPLETED";
const RFA_SUPPORT_PHONE = "0330 460 9877";
const RFA_SUPPORT_EMAIL = "helpdesk@redflagalert.com";

"use strict";

const { setResponseHeaders } = require('./rfa-common-files/rfa-common');
const { DOMParser } = require('xmldom');
const { RegulatoryComplianceListInstance } = require('twilio/lib/rest/numbers/v2/regulatoryCompliance');
var convertapi = require('convertapi')('secret_V23Qankup6YAlAhP');
//const decodeBase64 = (encodedStr) => { return atob(encodedStr); };
//const encodeBase64 = (str) => { return btoa(str); };

//XERO_aml_new_request                  RFA                     26/02/2025 Pushed live
//XERO_aml_update_request               RFA                     26/02/2025 Pushed live
//XERO_aml_resend_request               RFA                     26/02/2025 Pushed live

//XERO_pm_aml_getdocument               Xero, RFA               26/02/2025 Pushed live
//XERO_aml_getdocument                  Xero, RFA               26/02/2025 Pushed live
//XERO_oauth                            Firebase, Xero, RFA     26/02/2025 

//XERO_pm_update_contact                Xero
//XERO_pm_get_contacts                  Xero
//XERO_aml_create_history               Xero
//XERO_get_contacts                     Xero

//XERO_billing_subscriptions_webhook    Firebase, Xero
//XERO_get_accesstoken                  Firebase, Xero

//XERO_get_account                      Firebase
//XERO_update_credits                   Firebase

// SF_aml_update_request - 16/01/2025 Not used anymore
// SF_aml_resend_request - 16/01/2025 Not used anymore
// HS_aml_new_request    - 16/01/2025 Not used anymore

// OpenID 
// https://login.xero.com/identity/connect/authorize?response_type=code&client_id=94D1CFBA89EB40328EE3DA3FBC1B0B01&redirect_uri=https://europe-west1-redflag-live.cloudfunctions.net/XERO_oauth&scope=openid profile email&state=openid

// Xero Install Link
// https://login.xero.com/identity/connect/authorize?response_type=code&client_id=94D1CFBA89EB40328EE3DA3FBC1B0B01&redirect_uri=https://europe-west1-redflag-live.cloudfunctions.net/XERO_oauth&scope=openid profile email accounting.transactions accounting.contacts accounting.settings accounting.attachments offline_access&state=123

// Xero Practice Manager
// https://login.xero.com/identity/connect/authorize?response_type=code&client_id=94D1CFBA89EB40328EE3DA3FBC1B0B01&redirect_uri=https://europe-west1-redflag-live.cloudfunctions.net/XERO_oauth&scope=openid profile email offline_access practicemanager practicemanager.client&state=123

// 08/01/2025 JD Create backup and tidyup code (reduced from 3300 to 2062)
// 24/02/2025 JD Fixed isse with which tenant by using authentication_event_id

// 04/03/2025 JD XERO_billing_subscriptions_webhook Update Sub pricing 
// 04/03/2025 JD XERO_oauth email_send_rfa - emails support

/*****************************************************************************************************************************************************************/

//test();
async function test() {
    console.log("📘📘📘: test :📘📘📘");
    return;

    var subject = "Xero Test";

    var installdate = "test 2";
    var xero_type = "test 2";
    var emailmessage = '<p style="font-size: 16px;">UPDATE Installation Date: <strong>' + installdate + '</strong></p><p style="font-size: 16px;">Xero Type: <strong>' + xero_type + '</strong></p>';
    email_send_rfa(subject, emailmessage);


    return;

    var requestid = "134238";
    var username = "jason@torasoftware.co.uk";
    var password = "pigface007";
    var url = "https://europe-west1-redflag-live.cloudfunctions.net/XERO_aml_update_request?requestid=" + requestid + "&username=" + username + "&password=" + password;
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = async function() {
        console.log("📘 this.status", this.status);
        console.log("📘 tthis.responseText", this.responseText);
    }
    xhr.send();
    return;




    console.log("📘: request.username", "jason@torasoftware.co.uk", "request.password", "pigface007");
    // 21/05/2025 Get username and password

    var data = {};
    var results = await aml_get_accesstoken("jason@torasoftware.co.uk", "pigface007");

    console.log(results);
    return;

    //var tenantid = "f01cc07a-c533-465c-bef2-25490b1dd672";
    //var rfa_username = "jason@torasoftware.co.uk";
    //var rfa_password = "pigface007";
    //firebase_update_username_and_password(tenantid, rfa_username, rfa_password);
    //return;

    var tenantid = "f01cc07a-c533-465c-bef2-25490b1dd672";

    var url = "https://europe-west1-redflag-live.cloudfunctions.net/XERO_get_accesstoken?tenantid=" + tenantid + "&api_key=" + RFA_API_KEY;
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = async function() {
        console.log("📘 this.status", this.status);
        console.log("📘 tthis.responseText", this.responseText);
    }
    xhr.send();
    return;



    //var tenantid = "65a0354c-c9ff-4566-86d9-f953af601fa1"; // CCPRAC UK XPM TEST

    var tenantid = "a221dd5e-2bdf-4fd3-b56a-6beae564150e";

    var creditlimit = "100";
    var creditcounter = "100";
    firebase_update_credits(tenantid, creditlimit, creditcounter);
    return;


    //https://console.firebase.google.com/u/1/project/redflag-live/database/redflag-live/data/~2FXERO_account~2Fa221dd5e-2bdf-4fd3-b56a-6beae564150e

    var user = { 
        firstname : "Bruce",
        lastname  : "Lee",
        email     : "brucelee@hotmail.com"
    };
    var rfaresults = await rfa_create_user(user);
    if (rfaresults.status == "SUCCESS") {
        console.log("📗: SUCCESS : rfa_create_user - password", rfaresults.password);
    }
    return;

   var tenantid = "65a0354c-c9ff-4566-86d9-f953af601fa1"; // CCPRAC UK XPM TEST
   var tenantid = "02972e2d-6c2e-4488-8643-f486b9fcdd7d";
   var tenantid = "a221dd5e-2bdf-4fd3-b56a-6beae564150e";
   
    var creditlimit = "100";
    var creditcounter = "100";
    firebase_update_credits(tenantid, creditlimit, creditcounter);
    return;
    
   

    var xero = {};
    xero.client_id     = XERO_CLIENT_ID;
    xero.client_secret = XERO_CLIENT_SECRET;
    xero.tenant_id     = tenantid;
    xero.refresh_token = "p6q21_HzgmXScF6RhUhiSm0vkzOztVmeFwgZByAsfsg";
    var results = await xero_revoke_refresh_token(xero.client_id, xero.client_secret, xero.refresh_token);
    console.log("📘: results", results);
    return;

    var url = "https://europe-west1-redflag-live.cloudfunctions.net/XERO_disconnect?tenantid=" + tenantid + "&api_key=" + RFA_API_KEY;
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = async function() {
        console.log("📘 this.status", this.status);
        console.log("📘 tthis.responseText", this.responseText);
    }
    xhr.send();
    return;

    var xero = {};
    xero.client_id     = XERO_CLIENT_ID;
    xero.client_secret = XERO_CLIENT_SECRET;
    xero.tenant_id     = tenantid;
    //xero.refresh_token = "nJ6uq3aY4w5l-yzgZh5f9SCJB-ba3RlMc8B9s2YAbVc";
    xero.refresh_token = "Yb0Qci4FpD9llZKqp-0qhC7f7JnMO-jH5ALSVIc30jM";

    var connectionid = "a6a1c799-d865-4187-b23a-213c72ecefd7";

    var deleteresults = await xero_delete_connection(connectionid, xeroresults.access_token);
    console.log("✅: deleteresults", deleteresults);
    return;

    var tenantid = "f01cc07a-c533-465c-bef2-25490b1dd672"; // Red Flag Alert
    var tenantid = "a221dd5e-2bdf-4fd3-b56a-6beae564150e";
    //var tenantid = "65a0354c-c9ff-4566-86d9-f953af601fa1";
    //var tenantid = "93f128a3-452c-42f8-84cf-228892f70856";

    var tenantid = "65a0354c-c9ff-4566-86d9-f953af601fa1"; // CCPRAC UK XPM TEST
    var creditlimit = "100";
    var creditcounter = "100";
    firebase_update_credits(tenantid, creditlimit, creditcounter);
    return;

    var password = '-RfoI1`Vu2c*';
    const encoded = btoa(password); // Encode
    //const decoded = atob(encoded); // Decode
    return;

    var requestid = "134238";
    var username = "jason@torasoftware.co.uk";
    var password = "pigface007";
    var url = "https://europe-west1-redflag-live.cloudfunctions.net/XERO_aml_update_request?requestid=" + requestid + "&username=" + username + "&password=" + password;
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = async function() {
        console.log("📘 this.status", this.status);
        console.log("📘 tthis.responseText", this.responseText);
    }
    xhr.send();
    return;
}
/*****************************************************************************************************************************************************************/

function xero_pm_get_staff(ip_access_token, ip_tenant_id) {

    return new Promise((resolve, reject) => {
        const options = {
            method  : 'GET', 
            url     : XERO_PM_API_URL + "staff.api/list",
            headers : { 'Content-Type' : 'application/json', 'Authorization' : `Bearer ${ip_access_token}`, 'Xero-tenant-id' : ip_tenant_id }
        };
        request(options, (error, response, body) => {
            var results = {};
            if (response.statusCode == 200) {
                results.status = "SUCCESS";
                results.data = parseCustomFields_staff(body);
                resolve(results);
                return;
            }
            console.error("📕: ERROR : xero_pm_get_staff", response.statusCode, body);
            results.status = "ERROR";
            results.data = null;
            resolve(results);
            return;
            
        }).catch(function (error) {
            console.error("📕: ERROR : xero_pm_get_staff - catch");
            var results = {};
            results.status = "ERROR";
            results.data = null;
            resolve(results);
            return;
        });
    });    
}
/*****************************************************************************************************************************************************************/

function parseCustomFields_staff(xmlString) {

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "application/xml");
    const customFields = xmlDoc.getElementsByTagName("Staff");
    const jsonFields = [];
    Array.from(customFields).forEach((field) => {
        var record = {};
        record.uuid = field.getElementsByTagName("UUID")[0].textContent || null;
        record.email = field.getElementsByTagName("Email")[0].textContent || null;
        const name = field.getElementsByTagName("Name")[0].textContent || null;
        var nameParts = name.split(" "); 
        record.firstname = nameParts[0] || ""; 
        record.lastname = nameParts.slice(1).join(" ") || ""; 
        jsonFields.push(record);
    });
    return jsonFields;
}
/*****************************************************************************************************************************************************************/

exports.XERO_disconnect = functions.runWith(runtimeOpts128).region('europe-west1').https.onRequest(async (req, res) => {

    const tenantid = req.query.tenantid;
    const api_key  = req.query.api_key;

    setResponseHeaders(res); // Set CORS headers
    if (req.method === 'OPTIONS') res.status(204).send('');
    else {
        var results = {};
        if (!api_key) {
            results.status = "ERROR";
            results.error = "NO API Key";
            res.status(200).send(results);
            return;
        }
        if (api_key !== RFA_API_KEY) {
            results.status = "ERROR";
            results.error = "Invalid API Key";
            res.status(200).send(results);
            return;
        }
        if (!tenantid) {
            results.status = "ERROR";
            results.error = "NO Tenant Id";
            res.status(200).send(results);
            return;
        }
        // Firebase - Get account details
        var xero_account = await xero_get_account(tenantid);    
        console.log("📘: xero_account", xero_account);   
        if (xero_account == "NODATA")	{
            console.error("📕: ERROR: xero_get_account", tenantid);
            results.status = "ERROR";
            results.error = "Unable to get Firebase account for tenantid.";
            res.status(200).send(results);   
            return;
        }            
        console.log("📗: FIREBASE : SUCCESS : xero_get_account");
        // Xero - Get access Token
        var xero = {};
        xero.client_id     = XERO_CLIENT_ID;
        xero.client_secret = XERO_CLIENT_SECRET;
        xero.tenant_id     = tenantid;
        xero.refresh_token = xero_account.refresh_token;
        var xeroresults = await xero_getaccesstoken(xero);
        if (xeroresults.status == "ERROR") {
            console.error("📕: ERROR: xero_getaccesstoken", xero);
            results.status = "ERROR";
            results.message = "Not able to create a Xero access token.";
            res.status(200).send(results);   
            return;
        }
        // Xero - Delete connection
        if (xero_account.connectionid) {
            var deleteresults = await xero_delete_connection(xero_account.connectionid, xeroresults.access_token);
            if (deleteresults == "ERROR") {
                console.error("📕: ERROR: xero_delete_connection - xero_account.connectionid", xero_account.connectionid);
                results.status = "ERROR";
                results.message = "Not able to delete Xero connection.";
                res.status(200).send(results);   
                return;
            }
        }
        else {
            console.log("📘: Account has no Xero connectionid");   
        }
        // Xero - Revoke Refresh Token
        var deleteresults = await xero_revoke_refresh_token(xero.client_id, xero.client_secret, xero.refresh_token);
        if (deleteresults == "ERROR") {
            console.error("📕: ERROR: xero_revoke_refresh_token");
            results.status = "ERROR";
            results.message = "Not able to revoke Xero refresh token.";
            res.status(200).send(results);   
            return;
        }
        // Firebase Update
        var disconnectdate = moment().format('DD/MM/YYYY');

        admin.database().ref(XERO_FB_TABLE + "/" + tenantid).update({
            access_token         : "",  
            refresh_token        : "",
            expiresIn            : "",
            xero_disconnect_date : disconnectdate
        }).then(() => {
            console.log("📗: FIREBASE : SUCCESS : update");
        }).catch((error) => {
            console.log("📕: FIREBASE : ERROR : update", XERO_FB_TABLE + "/" + tenantid);
        });

        results.status = "SUCCESS";
        res.status(200).send(results);   
    }    
});
/****************************************************************************************************************************************************************/

async function xero_delete_connection(connectionId, accessToken) {

    return new Promise(async (resolve) => {  
        const url = `https://api.xero.com/connections/${connectionId}`;
        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${accessToken}`, "Content-Type": "application/json" }
            });
            if (response.status === 204) {
                console.log("✅ Connection deleted successfully");
                resolve("SUCCESS");
                return { success: true, message: "Connection deleted successfully" };
            } 
            else {
                const errorData = await response.json();
                console.error("❌ Error deleting connection:", errorData);
                resolve("ERROR");
                return { success: false, error: errorData };
            }
        } catch (error) {
            console.error("❌ Network error:", error);
            resolve("ERROR");
            return { success: false, error: error.message };
        }
    });
}
/*****************************************************************************************************************************************************************/

async function xero_revoke_refresh_token(ip_clientid, ip_clientsecret, ip_refresh_token) {

    return new Promise(async (resolve) => {
        const url = "https://identity.xero.com/connect/revocation";
        const credentials = btoa(`${ip_clientid}:${ip_clientsecret}`); // Base64 encode client credentials
        try {
            const response = await fetch(url, {
                method  : "POST",
                headers : { "Authorization": `Basic ${credentials}`, "Content-Type": "application/x-www-form-urlencoded", },
                body    : new URLSearchParams({ token: ip_refresh_token }).toString(),
            });
            if (!response.ok) {
                console.error("❌ xero_revoke_refresh_token - ERROR", response.statusText);
                resolve("ERROR");
                return;
            }
            console.log("✅ xero_revoke_refresh_token - SUCCESS");
            resolve("SUCCESS"); // No JSON parsing needed since it's a 204 response
        } catch (error) {
            console.error("❌ xero_revoke_refresh_token - EXCEPTION", error);
            resolve("ERROR");
        }
    });
}
/*****************************************************************************************************************************************************************/
 
exports.XERO_aml_resend_request = functions.runWith(runtimeOpts128).region('europe-west1').https.onRequest(async (req, res) => {

    var request = {};
    request.requestid   = req.query.requestid;
    // 21/05/2025 Get username and password
    request.tenantid     = req.query.tenantid; 
    //request.username    = req.query.username;
    //request.password    = req.query.password;
    // 21/05/2025 Get username and password
    console.log("📘: request", request);

    res.set('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
        res.set('Access-Control-Allow-Methods', 'GET');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
    } 
    else {
        // 21/05/2025 Get username and password
        var xero_account = await xero_get_account(request.tenantid);    
        if (xero_account == "NODATA")	{
            console.error("📕: ERROR: xero_get_account", tenantid);
            var results = { status: "ERROR", message: "xero_get_account"};
            res.status(200).send(results);
            return;
        }   
        request.username = xero_account.username;
        request.password = xero_account.password;
        console.log("📘: request.username", request.username, "request.password", request.password);
        // 21/05/2025 Get username and password
        
        var results = {};
        var tokenresults = await aml_get_accesstoken(request.username, request.password);
        if (tokenresults.status == "SUCCESS") console.log("📗: SUCCESS: aml_get_accesstoken");
        else {
            console.log("📕: ERROR : aml_get_accesstoken");
            results.status = "ERROR";
            results.error = "Get Access Token";
            res.status(200).send(results);  
            return;
        }
        var resendresults = await aml_resend_check(tokenresults.accesstoken, request.requestid);
        if (resendresults.status == "SUCCESS") {
            var results = {};
            results.status = "SUCCESS";
            results.aml_status = AML_STATUS_REQUESTED;
            results.aml_results = AML_RESULT_AWAITING;
            console.log("📗: SUCCESS: aml_resend_check");
        }
        else {
            results.status = "ERROR";
            results.error = "Resent Check Failed";
            console.log("📕: ERROR : aml_resend_check", request.requestid);
        }
        res.status(200).send(results);  
    }
});
/****************************************************************************************************************************************************************/

function aml_resend_check(ip_accesstoken, ip_requestid) {

    return new Promise(resolve => {
        var amlquery ='mutation test { idResendCheckNotifications(checkIds: [' + ip_requestid + ']) }';
        var amlvariables = {};
        var options = { 
            'method'  : 'POST', 
            'url'     : RFA_GRAPHQL_URL, 
            'headers' : { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + ip_accesstoken }, 
            body      : JSON.stringify({ query : amlquery, variables : amlvariables })
        }
        var results = {};
        request(options, function (error, response) {
            if (error) throw new Error(error);
            var body = JSON.parse(response.body);
            //console.log("📘: body", body); 
            var id = null;
            if (body.data) {
                if (body.data.idResendCheckNotifications) {
                    if (body.data.idResendCheckNotifications[0]) id = body.data.idResendCheckNotifications[0];
                }
            }
            if (id) {
                results.status = "SUCCESS";
                console.log("📗: SUCCESS : aml_resend_check - id", id);
            }
            else {
                results.status = "ERROR";
                console.log("📕: ERROR : aml_resend_check", ip_requestid);
            }
            resolve(results);    
            return;
        }).catch((error) => {
            results.status = "ERROR";
            console.log("📕: ERROR : aml_resend_check : CATCH", ip_requestid);
            resolve(results);    
            return;
        });
    });
}
/*******************************************************************************************************************************************************************************/

exports.XERO_aml_update_request = functions.runWith(runtimeOpts128).region('europe-west1').https.onRequest(async (req, res) => {

    var request = {};
    request.requestid   = Number(req.query.requestid);

    // 21/05/2025 Get username and password
    request.tenantid     = req.query.tenantid; 
    //request.username    = req.query.username;
    //request.password    = req.query.password;
    // 21/05/2025 Get username and password
    console.log("📘: request", request);

    res.set('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
        res.set('Access-Control-Allow-Methods', 'GET');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
    } 
    else {
        // 21/05/2025 Get username and password
        var xero_account = await xero_get_account(request.tenantid);    
        if (xero_account == "NODATA")	{
            console.error("📕: ERROR: xero_get_account", tenantid);
            var results = { status: "ERROR", message: "xero_get_account"};
            res.status(200).send(results);
            return;
        }   
        request.username = xero_account.username;
        request.password = xero_account.password;
        console.log("📘: request.username", request.username, "request.password", request.password);
        // 21/05/2025 Get username and password

        var data = {};
        var results = await aml_get_accesstoken(request.username, request.password);
        if (results.status == "SUCCESS") console.log("📗: SUCCESS: aml_get_accesstoken");
        else {
            console.log("📕: ERROR : aml_get_accesstoken");
            data.status = "ERROR";
            res.status(200).send(data);  
            return;
        }
        var amlresults = await aml_check_status(request.requestid, results.accesstoken);
        if (amlresults.status == "SUCCESS") {
            console.log("📗: SUCCESS: aml_check_status");
            data.status = "SUCCESS";
            data.aml_result = null;
            data.aml_result_updatedate = null;
            data.aml_status = null;
            data.aml_status_updatedate = null;
            // Get Result
            if (amlresults.data.result) {
                data.aml_result = amlresults.data.result.result;
                data.aml_result_updatedate = amlresults.data.result.createdDate;
            }
            // Get Latest status
            if (amlresults.data.statuses) {
                console.log("📘: Number of statuses", amlresults.data.statuses.length);
                data.aml_status            = amlresults.data.statuses[0].status;
                data.aml_status_updatedate = amlresults.data.statuses[0].createdDate;
            }
        }
        else if (amlresults.status == "NOTFOUND") {
            data.status = "NOTFOUND";
            console.log("📘: NOTFOUND Request Id", request.requestid);
        }
        console.log("📘: data", data);
        res.status(200).send(data);  
    }
});
/****************************************************************************************************************************************************************/

function aml_check_status(ip_id, ip_accesstoken) {
    
    return new Promise(resolve => {
        var skip = 0;
        var take = 1;
        var ids = [ ip_id ];
        var options = {
            'method'  : 'POST',
            'url'     : RFA_GRAPHQL_URL,
            'headers' : { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + ip_accesstoken },
            body      : JSON.stringify({ query: `query idvStatuses($skip: Int, $take: Int, $order: [CheckSortInput!], $ids: [Int!]) {
            idChecks(
                skip: $skip
                take: $take
                order: $order
                where: { id: { in: $ids } }
            ) {
                items {
                detail {
                    id
                    email
                    mobileNumber
                    firstName
                    middleName
                    lastName
                }
                user {
                    id
                    name
                    email
                }
                reference
                createdDate
                statuses(order: { createdDate: DESC }) {
                    id
                    status
                    createdDate
                }
                result {
                    id
                    result
                    reportUrl
                    createdDate
                    identificationDocument {
                    id
                    isSuccess
                    }
                }
                id
                }
                totalCount
            }
            }`,
                variables: {"skip":skip,"take":take,"order":{"createdDate":"DESC"},"ids":ids}
            })
        };
        var results = {};
        request(options, function (error, response) {
            if (error) throw new Error(error);
            var body = JSON.parse(response.body);
            //console.log("📘: body", body);
            // Not found
            if (body.data.idChecks.items.length == 0) {
                results.status = "NOTFOUND";
                results.data = null;
            }
            // Found
            else {
                results.status = "SUCCESS";
                results.data = body.data.idChecks.items[0];
            }
            resolve(results);    
            return;
        });
    });
}
/****************************************************************************************************************************************************************/

// 16/01/2025 copy of HS_aml_new_request

exports.XERO_aml_new_request = functions.runWith(runtimeOpts128).region('europe-west1').https.onRequest(async (req, res) => {

    var request = {};
    request.type         = req.query.type;
    //request.username     = req.query.username; // 21/01/2025
    //request.password     = req.query.password; // 21/01/2025
    request.firstname    = req.query.firstname; 
    request.lastname     = req.query.lastname;  
    request.middlename   = req.query.middlename;
    request.email        = req.query.email;
    request.mobile       = req.query.mobile;
    request.dob          = req.query.dob;
    request.sex          = req.query.sex;
    if (request.sex == "Male") request.sex = "MALE";       
    if (request.sex == "Female") request.sex = "FEMALE";    
    request.reference    = req.query.reference;
    request.message      = req.query.message;          
    request.addressLine1 = req.query.addressLine1;
    request.addressLine2 = req.query.addressLine2;
    request.addressLine3 = req.query.addressLine3;
    request.addressLine4 = req.query.addressLine4;
    request.country      = req.query.country;
    request.postcode     = req.query.postcode;
    request.ismonitored  = req.query.ismonitored;
    request.sendemail    = req.query.sendemail;        
    request.sendsms      = req.query.sendsms;           
    request.tenantid     = req.query.tenantid; // 21/01/2025 
    if (req.query.psamFuzziness)      request.psamFuzziness        = req.query.psamFuzziness;       
    if (req.query.firstResidenceDate) request.firstResidenceDate   = req.query.firstResidenceDate;  
    if (req.query.lastResidenceDate)  request.lastResidenceDate    = req.query.lastResidenceDate;   
    if (req.query.excludeAdverseMedia) request.excludeAdverseMedia = req.query.excludeAdverseMedia; 
    console.log("📘: request", request);

    res.set('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
        res.set('Access-Control-Allow-Methods', 'GET');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
    } 
    else {

        // 21/05/2025 Get username and password
        var xero_account = await xero_get_account(request.tenantid);    
        if (xero_account == "NODATA")	{
            console.error("📕: ERROR: xero_get_account", tenantid);
            var results = { status: "ERROR", message: "xero_get_account"};
            res.status(200).send(results);
            return;
        }   
        request.username = xero_account.username;
        request.password = xero_account.password;
        console.log("📘: request.username", request.username, "request.password", request.password);

        // GQL: Access token
        var tokenresults = await aml_get_accesstoken(request.username, request.password);
        if (tokenresults.status == "SUCCESS") {
            console.log("📗: SUCCESS: aml_get_accesstoken");    
        }
        else {
            console.log("📕: ERROR : aml_get_accesstoken");
            var results = { status: "ERROR", message: "aml_get_accesstoken"};
            res.status(200).send(results);
            return;
        }
        // Convert dob
        if (request.dob) {
            console.log("📘: Convert dob", request.dob);
            request.dob = new Date(request.dob);
        }
        request.dob = new Date(request.dob);
        console.log("📘: request.dob", request.dob);
    
        var amlresults = await aml_new_check(tokenresults.accesstoken, request);
        console.log("📘: results", amlresults);

        var results = {};
        if (amlresults.status == "SUCCESS") {
            console.log("📗: STEP 3 of 3 : SUCCESS: aml_new_check");
            results.status = "SUCCESS";
            results.aml_status = AML_STATUS_CREATED;
            results.aml_results = AML_RESULT_AWAITING;
            results.aml_requestid = amlresults.requestid;
        }
        else {
            console.log("📕: ERROR : aml_new_check", request);
            results.status = "ERROR";
        }
        res.status(200).send(results);  
        return;
    }
});
/****************************************************************************************************************************************************************/

function aml_new_check(ip_accesstoken, ip_request) {

    /*
    KNOW_YOUR_CLIENT                IDV        
    KNOW_YOUR_CLIENT_BASIC_AML      IDV + AML
    KNOW_YOUR_CLIENT_ENHANCED_AML   IDV + AML + PSAM
    KNOW_YOUR_CLIENT_PSAM           IDV + PSAM
    DOCUMENT_CHECK_BASIC_AML        Document Check + AML
    DOCUMENT_CHECK_ENHANCED_AML     Document Check + AML + PSAM
    BASIC_AML                       AML
    PSAM                            PSAM
    */

    if (ip_request.mobile) ip_request.mobile = "+" + ip_request.mobile; //ip_request.mobile +447956118041 WORKING

    // 10/07/2024
    /*
    var ismonitored = false;
    if (ip_request.ismonitored) ismonitored = ip_request.ismonitored;
    console.log("📘: ismonitored", ismonitored);
    */
    var ismonitored = false;
    if (ip_request.ismonitored) {
        if (ip_request.ismonitored == "ON") ismonitored = true;
    }
    // 10/07/2024
   
    addresses = {};
    if (ip_request.addressLine1 !== ' ') addresses.addressLine1 = ip_request.addressLine1;
    else addresses.addressLine1 = ' null';
    if (ip_request.addressLine2 !== ' ') addresses.addressLine2 = ip_request.addressLine2;
    else addresses.addressLine2 = ' null';
    if (ip_request.addressLine3 !== ' ') addresses.addressLine3 = ip_request.addressLine3;
    else addresses.addressLine3 = ' null';
    if (ip_request.addressLine4 !== ' ') addresses.addressLine4 = ip_request.addressLine4;
    else addresses.addressLine4 = ' null';
    addresses.country = ip_request.country;
    if (ip_request.postcode !== '') addresses.postcode = ip_request.postcode;
    else addresses.postcode = ' null';

    if (ip_request.firstResidenceDate && ip_request.firstResidenceDate !== ' ') addresses.firstResidenceDate = ip_request.firstResidenceDate + "T00:00:00Z";     // 05/07/2024
    if (ip_request.lastResidenceDate && ip_request.lastResidenceDate !== ' ') addresses.lastResidenceDate = ip_request.lastResidenceDate + "T00:00:00Z";        // 05/07/2024
    console.log("📘: addresses", addresses);
  
    return new Promise(resolve => {

        console.log("📘: Request Type", ip_request.type);
        // 11/03/2024
        var sendemail = true;
        if (ip_request.sendemail) {
            if (ip_request.sendemail == "ON") sendemail = true;     // 22/03/2024
            else sendemail = false;
        }
        var sendsms = true;
        if (ip_request.sendsms) {
            if (ip_request.sendsms == "ON") sendsms = true;         // 22/03/2024
            else sendsms = false;
        }
        console.log("📘📘: sendemail", sendemail, "sendsms", sendsms);
        // 11/03/2024

        // 03/05/2024
        var message = "";
        if (ip_request.message) {
            message = ip_request.message;
            message = message.replace("<firstname>", ip_request.firstname);
        }
        // 03/05/2024

        // 09/07/2024
        var amloptions = {};
        amloptions.sendEmailNotification = sendemail;
        amloptions.sendSmSNotification = sendsms;

        // Fuzziness of PSAM check between 0 and 1. A fuzziness of 1 will return more possible matches. 0 will perform an exact match
        //var psamFuzziness = 0.5;
        if (ip_request.psamFuzziness) {
            psamFuzziness = Number(ip_request.psamFuzziness);
            psamFuzziness = psamFuzziness / 10;
            amloptions.psamFuzziness = psamFuzziness
        }
        //var excludeAdverseMedia = false;
        if (ip_request.excludeAdverseMedia) {
            if (ip_request.excludeAdverseMedia == "true") amloptions.excludeAdverseMedia = true;
            else amloptions.excludeAdverseMedia = false;
        }
        // 09/07/2024

        var amlquery = `mutation createCheck($check: CheckRequestInput!) { idCreateCheck(checkRequest: $check) { id reference } }`;
             
        if (ip_request.type == "KNOW_YOUR_CLIENT" || ip_request.type == "KNOW_YOUR_CLIENT_BASIC_AML" || ip_request.type == "KNOW_YOUR_CLIENT_ENHANCED_AML" || ip_request.type == "BASIC_AML") {

            var amlvariables = {
                "check"     : {
                    "reference" : ip_request.reference,
                    "detail"    : {
                        "firstName"         : ip_request.firstname,
                        "middleName"        : ip_request.middlename,
                        "lastName"          : ip_request.lastname,
                        "email"             : ip_request.email,
                        "mobileNumber"      : ip_request.mobile,
                        "message"           : message,                  // 03/05/2024
                        "addresses"         : [addresses],
                        "identityDocuments" : [],
                        "dateOfBirth"       : ip_request.dob,
                        "sex"               : ip_request.sex
                    },
                    options: amloptions,
                    "checkType" : ip_request.type
                }
            } 
        }
        if (ip_request.type == "KNOW_YOUR_CLIENT_PSAM" || ip_request.type == "PSAM") {
            var amlvariables = {
                "check"     : {
                    "reference" : ip_request.reference,
                    "detail"    : {
                        "firstName"         : ip_request.firstname,
                        "middleName"        : ip_request.middlename,
                        "lastName"          : ip_request.lastname,
                        "email"             : ip_request.email,
                        "mobileNumber"      : ip_request.mobile,
                        "message"           : message,                  // 03/05/2024
                        "addresses"         : [addresses],
                        "identityDocuments" : [],
                        "dateOfBirth"       : ip_request.dob,
                        "sex"               : ip_request.sex,
                        "isMonitored"       : ismonitored
                    },
                    options: amloptions,                    
                    "checkType" : ip_request.type
                }
            } 
        }
        var options = { 
            'method'  : 'POST', 
            'url'     : RFA_GRAPHQL_URL, 
            'headers' : { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + ip_accesstoken }, 
            body      : JSON.stringify({ query : amlquery, variables : amlvariables })
        }
        console.log("📘: options", options);  

        var results = {};
        request(options, function (error, response) {
            if (error) throw new Error(error);
            var body = JSON.parse(response.body);
            //console.log("📘: body", body); 
            // 23/10/2023 Trap Error
            //if (body.data.idCreateCheck.id) {
            if (body.data.idCreateCheck) {
                results.status = "SUCCESS";
                results.requestid = body.data.idCreateCheck.id;
                console.log("📗: SUCCESS : aml_new_check", results.requestid);
            }
            else {
                results.status = "ERROR";
                console.log("📕: ERROR : aml_new_check", ip_request);
            }
            resolve(results);    
            return;
        }).catch((error) => {
            results.status = "ERROR";
            console.log("📕: ERROR : aml_new_check : CATCH", ip_request, error);
            resolve(results);    
            return;
        });
    });
}
/*******************************************************************************************************************************************************************************/

function rfa_create_user(ip_user) {

    return new Promise((resolve, reject) => {
        console.log("📘 rfa_create_user", ip_user);
        const body = JSON.stringify({
            first_name      : ip_user.firstname,
            last_name       : ip_user.lastname,
            email           : ip_user.email,
            has_api_access  : true,
            account_id      : RFA_ACCOUNT_ID,
            return_password : true,
            send_email      : false,
        });
        const options = {
            url     : RFA_CREATE_USER_URL,
            method  : "POST",
            headers : { "X-Api-Key": RFA_AML_API_KEY, "Content-Type": "application/json", },
            body    : body,
        };
        console.log("📘 options", options);
        request(options, (error, response, body) => {


            //console.log("📘 response", response);

            var results = {};
            if (response.statusCode == 201) {

                
                var data = JSON.parse(body);
                if (data.id) {
                    results.status = "SUCCESS";
                    results.password = data.password;
                    resolve(results);
                    return;
                }
            }
            console.log("📕: ERROR: rfa_create_user - response.statusCode", response.statusCode, response.body);
            results.status = "ERROR";
            resolve(results);
            return;

        }).catch(function (error) {
            console.log("📕: ERROR: rfa_create_user - Catch");
            var results = {};
            results.status = "ERROR";
            resolve(results);
            return;
        });
    });
}
/*****************************************************************************************************************************************************************/

function firebase_update_username_and_password(ip_tenantid, ip_rfa_username, ip_rfa_password) {

    var url = "https://europe-west1-redflag-live.cloudfunctions.net/XERO_update_credits?tenantid=" + ip_tenantid + "&api_key=" + RFA_API_KEY + "&rfa_username=" + ip_rfa_username + "&rfa_password=" + ip_rfa_password;
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = async function() {
        if (this.status == 200) {
            var xeroresults = JSON.parse(this.responseText);
            console.log("📘 xeroresults", xeroresults);
            return;
        }
        else {
            console.error("📕: ERROR: XERO_update_credits - this.status", this.status);
            var xeroresults = {};
            xeroresults.status = "ERROR";
            return;
        }
    }
    xhr.send();
    return;
}
/*****************************************************************************************************************************************************************/

function firebase_update_credits(ip_tenantid, ip_creditlimit, ip_creditcounter) {

    var url = "https://europe-west1-redflag-live.cloudfunctions.net/XERO_update_credits?tenantid=" + ip_tenantid + "&api_key=" + RFA_API_KEY + "&creditlimit=" + ip_creditlimit + "&creditcounter=" + ip_creditcounter;
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = async function() {
        if (this.status == 200) {
            var xeroresults = JSON.parse(this.responseText);
            console.log("📘 xeroresults", xeroresults);
            return;
        }
        else {
            console.error("📕: ERROR: XERO_update_credits - this.status", this.status);
            var xeroresults = {};
            xeroresults.status = "ERROR";
            return;
        }
    }
    xhr.send();
    return;
}
/*****************************************************************************************************************************************************************/

function xero_pm_get_contact_custom_fields(ip_access_token, ip_tenant_id, ip_id) {

    return new Promise((resolve, reject) => {
        const options = {
            method  : 'GET', 
            url     : XERO_PM_API_URL + "client.api/contact/" + ip_id + "/customfield",
            headers : { 'Content-Type' : 'application/json', 'Authorization' : `Bearer ${ip_access_token}`, 'Xero-tenant-id' : ip_tenant_id }
        };
        request(options, (error, response, body) => {
            var results = {};
            if (response.statusCode == 200) {
                results.status = "SUCCESS";
                const customFields = parseCustomFields(body);
                results.data = customFields;
                resolve(results);
                return;
            }
            console.error("📕: ERROR : xero_pm_get_custom_fields", response.statusCode, body);
            results.status = "ERROR";
            results.data = null;
            resolve(results);
            return;
        }).catch(function (error) {
            console.error("📕: ERROR : xero_pm_get_custom_fields - catch");
            var results = {};
            results.status = "ERROR";
            results.data = null;
            resolve(results);
            return;
        });
    });    
}
/*****************************************************************************************************************************************************************/

function parseCustomFields(xmlString) {

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "application/xml");
    const customFields = xmlDoc.getElementsByTagName("CustomField");
    const jsonFields = [];
    // Convert HTMLCollection to iterable Array using `Array.from`
    Array.from(customFields).forEach((field) => {
        const uuid = field.getElementsByTagName("UUID")[0].textContent || null;
        const name = field.getElementsByTagName("Name")[0].textContent || null;
        let value = null;
        if (field.getElementsByTagName("Text")[0]) {
            value = field.getElementsByTagName("Text")[0].textContent;
        } else if (field.getElementsByTagName("Date")[0]) {
            value = field.getElementsByTagName("Date")[0].textContent;
        } else if (field.getElementsByTagName("Boolean")[0]) {
            value = field.getElementsByTagName("Boolean")[0].textContent;
        }
        jsonFields.push({ UUID: uuid, Name: name, Value: value });
    });
    return jsonFields;
}
/*****************************************************************************************************************************************************************/

function xero_pm_update_contact_custom_fields(ip_access_token, ip_tenant_id, ip_data, ip_custom_fields_arr) {
   
    return new Promise((resolve, reject) => {
        var body = "<CustomFields>";
        if (ip_data.rfa_status) {
            var fieldresult = ip_custom_fields_arr.find(item => item.Name === 'RFA Status');
            if (fieldresult.UUID) body += "<CustomField><UUID>" + fieldresult.UUID + "</UUID><Text>" + ip_data.rfa_status + "</Text></CustomField>";
        }
        if (ip_data.rfa_result) {
            var fieldresult = ip_custom_fields_arr.find(item => item.Name === 'RFA Result');
            if (fieldresult.UUID) body += "<CustomField><UUID>" + fieldresult.UUID + "</UUID><Text>" + ip_data.rfa_result + "</Text></CustomField>";
        }
        if (ip_data.rfa_url) {
            var fieldresult = ip_custom_fields_arr.find(item => item.Name === 'RFA URL');
            if (fieldresult.UUID) body += "<CustomField><UUID>" + fieldresult.UUID + "</UUID><Text>" + ip_data.rfa_url + "</Text></CustomField>";
        }
        if (ip_data.rfa_type) {
            var fieldresult = ip_custom_fields_arr.find(item => item.Name === 'RFA Type');
            if (fieldresult.UUID) body += "<CustomField><UUID>" + fieldresult.UUID + "</UUID><Text>" + ip_data.rfa_type + "</Text></CustomField>";
        }
        if (ip_data.rfa_dob) {
            var fieldresult = ip_custom_fields_arr.find(item => item.Name === 'RFA Date of Birth');
            if (fieldresult.UUID) body += "<CustomField><UUID>" + fieldresult.UUID + "</UUID><Date>" + ip_data.rfa_dob + "</Date></CustomField>";
        }
        if (ip_data.rfa_title) {
            var fieldresult = ip_custom_fields_arr.find(item => item.Name === 'RFA Title');
            if (fieldresult.UUID) body += "<CustomField><UUID>" + fieldresult.UUID + "</UUID><Text>" + ip_data.rfa_title + "</Text></CustomField>";
        }
        if (ip_data.rfa_gender) {
            var fieldresult = ip_custom_fields_arr.find(item => item.Name === 'RFA Gender');
            if (fieldresult.UUID) body += "<CustomField><UUID>" + fieldresult.UUID + "</UUID><Text>" + ip_data.rfa_gender + "</Text></CustomField>";
        }
        if (ip_data.rfa_middle_name) {
            var fieldresult = ip_custom_fields_arr.find(item => item.Name === 'RFA Middle Name');
            if (fieldresult.UUID) body += "<CustomField><UUID>" + fieldresult.UUID + "</UUID><Text>" + ip_data.rfa_middle_name + "</Text></CustomField>";
        }
        if (ip_data.rfa_date_of_first_residence) {
            var fieldresult = ip_custom_fields_arr.find(item => item.Name === 'RFA Date of First Residence');
            if (fieldresult.UUID) body += "<CustomField><UUID>" + fieldresult.UUID + "</UUID><Date>" + ip_data.rfa_date_of_first_residence + "</Date></CustomField>";
        }
        if (ip_data.rfa_requestid) {
            var fieldresult = ip_custom_fields_arr.find(item => item.Name === 'RFA Request Id');
            if (fieldresult.UUID) body += "<CustomField><UUID>" + fieldresult.UUID + "</UUID><Text>" + ip_data.rfa_requestid + "</Text></CustomField>";
        }
        if (ip_data.rfa_update_date) {
            var fieldresult = ip_custom_fields_arr.find(item => item.Name === 'RFA Update Date');
            if (fieldresult.UUID) body += "<CustomField><UUID>" + fieldresult.UUID + "</UUID><Date>" + ip_data.rfa_update_date + "</Date></CustomField>";
        }
        if (ip_data.rfa_housenumber) {
            var fieldresult = ip_custom_fields_arr.find(item => item.Name === 'RFA House Name/Number');
            if (fieldresult.UUID) body += "<CustomField><UUID>" + fieldresult.UUID + "</UUID><Text>" + ip_data.rfa_housenumber + "</Text></CustomField>";
        }
        if (ip_data.rfa_street) {
            var fieldresult = ip_custom_fields_arr.find(item => item.Name === 'RFA Street');
            if (fieldresult.UUID) body += "<CustomField><UUID>" + fieldresult.UUID + "</UUID><Text>" + ip_data.rfa_street + "</Text></CustomField>";
        }
        if (ip_data.rfa_city) {
            var fieldresult = ip_custom_fields_arr.find(item => item.Name === 'RFA City');
            if (fieldresult.UUID) body += "<CustomField><UUID>" + fieldresult.UUID + "</UUID><Text>" + ip_data.rfa_city + "</Text></CustomField>";
        }
        if (ip_data.rfa_county) {
            var fieldresult = ip_custom_fields_arr.find(item => item.Name === 'RFA County');
            if (fieldresult.UUID) body += "<CustomField><UUID>" + fieldresult.UUID + "</UUID><Text>" + ip_data.rfa_county + "</Text></CustomField>";
        }
        if (ip_data.rfa_postcode) {
            var fieldresult = ip_custom_fields_arr.find(item => item.Name === 'RFA Postcode');
            if (fieldresult.UUID) body += "<CustomField><UUID>" + fieldresult.UUID + "</UUID><Text>" + ip_data.rfa_postcode + "</Text></CustomField>";
        }
        if (ip_data.rfa_country) {
            var fieldresult = ip_custom_fields_arr.find(item => item.Name === 'RFA Country');
            if (fieldresult.UUID) body += "<CustomField><UUID>" + fieldresult.UUID + "</UUID><Text>" + ip_data.rfa_country + "</Text></CustomField>";
        }
        if (ip_data.rfa_reference) {
            var fieldresult = ip_custom_fields_arr.find(item => item.Name === 'RFA Reference');
            if (fieldresult.UUID) body += "<CustomField><UUID>" + fieldresult.UUID + "</UUID><Text>" + ip_data.rfa_reference + "</Text></CustomField>";
        }
        if (ip_data.rfa_username) {
            var fieldresult = ip_custom_fields_arr.find(item => item.Name === 'RFA Username');
            if (fieldresult.UUID) body += "<CustomField><UUID>" + fieldresult.UUID + "</UUID><Text>" + ip_data.rfa_username + "</Text></CustomField>";
        }
        body += "</CustomFields>";  
        const options = {
            method  : 'PUT', 
            url     : XERO_PM_API_URL + "client.api/contact/" + ip_data.uuid + "/customfield",
            headers : { 'Content-Type' : 'application/json', 'Authorization' : `Bearer ${ip_access_token}`, 'Xero-tenant-id' : ip_tenant_id },
            body : body
        };
        var results = {};        
        request(options, (error, response, body) => {
            if (response.statusCode == 200) {
                console.log('📗: SUCCESS : xero_pm_update_contact_custom_fields');
                results.status = "SUCCESS";
                var xmlresults = parseAddCustomFieldResponse(body);
                results.data = xmlresults;
                resolve(results);    
                return;
            }
            console.error("📕: ERROR : xero_pm_update_contact_custom_fields", response.statusCode, body);
            results.status = "ERROR";
            results.data = null;
            resolve(results);
            return;
            
        }).catch(function (error) {
            console.error("📕: ERROR : xero_pm_update_contact_custom_fields - catch");
            results.status = "ERROR";
            results.data = null;
            resolve(results);
            return;
        });
    });    
}
/*****************************************************************************************************************************************************************/

function xero_pm_update_contact(ip_access_token, ip_tenant_id, ip_data) {
   
    return new Promise((resolve, reject) => {
        var body = "<Contact>";
        body += "<Name>" + ip_data.name + "</Name>";
        if (ip_data.email)       body += "<Email>"      + ip_data.email + "</Email>";
        if (ip_data.mobile)      body += "<Mobile>"     + ip_data.mobile + "</Mobile>";
        body += "</Contact>";
        console.log("📘 body", body);

        const options = {
            method  : 'PUT', 
            url     : XERO_PM_API_URL + "client.api/contact/" + ip_data.uuid,
            headers : { 'Content-Type' : 'application/json', 'Authorization' : `Bearer ${ip_access_token}`, 'Xero-tenant-id' : ip_tenant_id },
            body : body
        };
        var results = {};        
        request(options, (error, response, body) => {
            if (response.statusCode == 200) {
                console.log("📗: SUCCESS : xero_pm_update_contact");
                results.status = "SUCCESS";
                var xmlresults = parseAddCustomFieldResponse(body);
                results.data = xmlresults;
                resolve(results);    
                return;
            }
            console.error("📕: ERROR : xero_pm_update_contact", response.statusCode, body);
            results.status = "ERROR";
            results.data = null;
            resolve(results);
            return;
            
        }).catch(function (error) {
            console.error("📕: ERROR : xero_pm_update_contact - catch");
            results.status = "ERROR";
            results.data = null;
            resolve(results);
            return;
        });
    });    
}
/*****************************************************************************************************************************************************************/

async function xero_create_custom_fields(ip_access_token, ip_tenant_id) {

    return new Promise(async (resolve) => {  
        var aml_fields = [];
        var aml_field = { fieldname : "RFA Status", type : "Text" };
        aml_fields.push(aml_field);
        var aml_field = { fieldname : "RFA Result", type : "Text" };
        aml_fields.push(aml_field);
        var aml_field = { fieldname : "RFA URL", type : "Text" };
        aml_fields.push(aml_field);
        var aml_field = { fieldname : "RFA Type", type : "Text" };
        aml_fields.push(aml_field);
        var aml_field = { fieldname : "RFA Date of Birth", type : "Date" };
        aml_fields.push(aml_field);
        var aml_field = { fieldname : "RFA Title", type : "Text" };
        aml_fields.push(aml_field);
        var aml_field = { fieldname : "RFA Gender", type : "Text" };
        aml_fields.push(aml_field);
        var aml_field = { fieldname : "RFA Middle Name", type : "Text" };
        aml_fields.push(aml_field);
        var aml_field = { fieldname : "RFA Date of First Residence", type : "Date" };
        aml_fields.push(aml_field);
        var aml_field = { fieldname : "RFA Request Id", type : "Text" };
        aml_fields.push(aml_field);
        var aml_field = { fieldname : "RFA Update Date", type : "Date" };
        aml_fields.push(aml_field);
        var aml_field = { fieldname : "RFA House Name/Number", type : "Text" };
        aml_fields.push(aml_field);
        var aml_field = { fieldname : "RFA Street", type : "Text" };
        aml_fields.push(aml_field);
        var aml_field = { fieldname : "RFA City", type : "Text" };
        aml_fields.push(aml_field);
        var aml_field = { fieldname : "RFA County", type : "Text" };
        aml_fields.push(aml_field);
        var aml_field = { fieldname : "RFA Postcode", type : "Text" };
        aml_fields.push(aml_field);
        var aml_field = { fieldname : "RFA Country", type : "Text" };
        aml_fields.push(aml_field);
        var aml_field = { fieldname : "RFA Reference", type : "Text" };
        aml_fields.push(aml_field);
        var aml_field = { fieldname : "RFA Username", type : "Text" };
        aml_fields.push(aml_field);

        for (var i = 0; i < aml_fields.length ; i++) { 
            var xero_field = { fieldname : aml_fields[i].fieldname, type : aml_fields[i].type };
            var field = xero_build_field_xml(xero_field);
            var results = await xero_create_custom_field(ip_access_token, ip_tenant_id, field);
            if (results == "SUCCESS") {
                console.log("📗: SUCCESS : xero_create_custom_field", aml_fields[i].fieldname);
            }
            else {
                console.log("📕: ERROR xero_create_custom_field", aml_fields[i].fieldname);
                resolve("ERROR");                
                return;
            }
        }
        resolve("SUCCESS");
        return;
    });        
}
/*****************************************************************************************************************************************************************/

function xero_create_custom_field(ip_access_token, ip_tenant_id, ip_body) {

    return new Promise(resolve => {
        const options = {
            method  : 'POST', 
            url     : XERO_PM_API_URL + "customfield.api/add",
            headers : { 'Content-Type' : 'application/xml', 'Authorization' : `Bearer ${ip_access_token}`, 'Xero-tenant-id' : ip_tenant_id },
            body    : ip_body
        };
        var results = {};
        request(options, function (error, response) {
            var results = parseAddCustomFieldResponse(response.body);
            resolve(results);    
            return;
        }).catch((error) => {
            console.log("📕: ERROR : xero_create_custom_field : CATCH");
            results.status = "ERROR";
            resolve(results);    
            return;
        });
    });
}
/*******************************************************************************************************************************************************************************/

function parseAddCustomFieldResponse(xmlString) {

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");
    const statusNode = xmlDoc.getElementsByTagName("Status")[0];
    if (!statusNode || statusNode.textContent !== "OK") {
        return "ERROR";
    }
    return "SUCCESS";
}
/*****************************************************************************************************************************************************************/

function xero_build_field_xml(ip_field) {

    // Build custom fields for contacts
    var field = "<CustomFieldDefinition>";
    field += "<Name>" + ip_field.fieldname + "</Name>";
    field += "<Type>" + ip_field.type + "</Type>";
    field += "<UseClient>false</UseClient>";
    field += "<UseContact>true</UseContact>";
    field += "<UseJob>false</UseJob>";
    field += "<UseJobTask>false</UseJobTask>";
    field += "<UseJobCost>false</UseJobCost>";
    field += "<UseJobTime>false</UseJobTime>";
    field += "</CustomFieldDefinition>";
    return field;
}
/*****************************************************************************************************************************************************************/

function xero_pm_get_custom_fields(ip_access_token, ip_tenant_id) {

    return new Promise((resolve, reject) => {
        const options = {
            method  : 'GET', 
            url     : XERO_PM_API_URL + "customfield.api/definition",
            headers : { 'Content-Type' : 'application/json', 'Authorization' : `Bearer ${ip_access_token}`, 'Xero-tenant-id' : ip_tenant_id }
        };
        request(options, (error, response, body) => {

            var results = {};
            if (response.statusCode == 200) {
                console.log('📗: SUCCESS : xero_pm_get_custom_fields');
                results.status = "SUCCESS";
                const customFields = parseCustomFieldDefinitions(body);
                results.data = customFields;
                resolve(results);
                return;
            }
            console.error("📕: ERROR : xero_pm_get_custom_fields", response.statusCode, body);
            results.status = "ERROR";
            results.data = null;
            resolve(results);
            return;
            
        }).catch(function (error) {
            console.error("📕: ERROR : xero_pm_get_custom_fields - catch");
            var results = {};
            results.status = "ERROR";
            results.data = null;
            resolve(results);
            return;
        });
    });    
}
/*****************************************************************************************************************************************************************/

function parseCustomFieldDefinitions(xmlString) {

    // Parse the XML string into a DOM
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");
    // Check for errors in the XML
    const statusNode = xmlDoc.getElementsByTagName("Status")[0];

    if (!statusNode || statusNode.textContent !== "OK") {
        throw new Error("Invalid response status: " + (statusNode.textContent || "Unknown"));
    }
    // Extract all custom field definitions
    const customFieldNodes = xmlDoc.getElementsByTagName("CustomFieldDefinition");
    const customFields = [];

    for (let i = 0; i < customFieldNodes.length; i++) {
        const node = customFieldNodes[i];
        const customField = {
            UUID: node.getElementsByTagName("UUID")[0].textContent || null,
            Name: node.getElementsByTagName("Name")[0].textContent || null,
            UseClient: node.getElementsByTagName("UseClient")[0].textContent === "true",
            UseContact: node.getElementsByTagName("UseContact")[0].textContent === "true",
            UseJob: node.getElementsByTagName("UseJob")[0].textContent === "true",
            Type: node.getElementsByTagName("Type")[0].textContent || null,
            ValueElement: node.getElementsByTagName("ValueElement")[0].textContent || null,
        };
        customFields.push(customField);
    }
    return customFields;
}
/*****************************************************************************************************************************************************************/

exports.XERO_pm_update_contact = functions.runWith(runtimeOpts128).region('europe-west1').https.onRequest(async (req, res) => {

    const tenant_id    = req.query.tenant_id;
    const access_token = req.query.access_token;
    console.log("📘: tenantid", tenant_id, "access_token", access_token);   

    var data = {};
    data.uuid = req.query.uuid;
    data.name = req.query.name;
    data.email = req.query.email;
    data.mobile = req.query.mobile;
    // Custom fields
    data.rfa_status = req.query.rfa_status;
    data.rfa_result = req.query.rfa_result;
    data.rfa_url = req.query.rfa_url;
    data.rfa_type = req.query.rfa_type;
    if (req.query.rfa_dob) data.rfa_dob = req.query.rfa_dob.replace(/-/g, '');
    data.rfa_title = req.query.rfa_title;
    data.rfa_gender = req.query.rfa_gender;
    data.rfa_middle_name = req.query.rfa_middle_name;
    if (req.query.rfa_date_of_first_residence) data.rfa_date_of_first_residence = req.query.rfa_date_of_first_residence.replace(/-/g, '');
    data.rfa_requestid = req.query.rfa_requestid;
    data.rfa_housenumber = req.query.rfa_housenumber;
    data.rfa_street = req.query.rfa_street;
    data.rfa_city = req.query.rfa_city;
    data.rfa_county = req.query.rfa_county;
    data.rfa_postcode = req.query.rfa_postcode;
    data.rfa_country = req.query.rfa_country;
    data.aml_only = "no";
    if (req.query.aml_only) {
        data.aml_only = "yes";
        var today = new Date();
        var yyyy = today.getFullYear();
        var mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so add 1
        var dd = String(today.getDate()).padStart(2, '0'); // Ensure two digits
        data.rfa_update_date = yyyy + mm + dd;
    }
    data.rfa_reference = req.query.rfa_reference;
    data.rfa_username = req.query.rfa_username;
    console.log("📘: data", data);   

    setResponseHeaders(res); // Set CORS headers
    if (req.method === 'OPTIONS') res.status(204).send('');
    else {    
        results = {};
        // PRACTICE MANAGER : Get and store custom fields - Need uuid's for updating
        var results = await xero_pm_get_custom_fields(access_token, tenant_id);
        if (results.status !== "SUCCESS") {
            console.log("📕: ERROR : xero_pm_get_custom_fields", access_token, tenant_id);
            return;
        }
        var custom_fields_arr = results.data;
        console.log("📗: custom_fields_arr", custom_fields_arr.length);

        if (data.aml_only == "no") {
            console.log("📘: Update contact details");    
            var updateresults = await xero_pm_update_contact(access_token, tenant_id, data); // PRACTICE MANAGER : Update contact
            console.log("📘: xero_pm_update_contact - updateresults", updateresults);    
        }
        var updateresults = await xero_pm_update_contact_custom_fields(access_token, tenant_id, data, custom_fields_arr); // PRACTICE MANAGER : Update contact custom fields        
        console.log("📘: xero_pm_update_contact_custom_fields - updateresults", updateresults);
        results.status = "SUCCESS";
        res.status(200).send(results);   
    }    
});
/****************************************************************************************************************************************************************/

exports.XERO_pm_get_contacts = functions.runWith(runtimeOpts128).region('europe-west1').https.onRequest(async (req, res) => {

    const tenant_id    = req.query.tenant_id;
    const access_token = req.query.access_token;
    var search = null;
    if (req.query.search) search = req.query.search;
    var contact_id = null;
    if (req.query.contact_id) contact_id   = req.query.contact_id;
    console.log("📘: 06/12/2024 tenantid", tenant_id, "access_token", access_token, "search", search, "contact_id", contact_id);   

    setResponseHeaders(res); // Set CORS headers
    if (req.method === 'OPTIONS') res.status(204).send('');
    else {    
        results = {};
        var data = await xero_pm_get_clients(access_token, tenant_id, true);
        if (!data.data) {
            console.log("📕: ERROR xero_pm_get_clients", access_token, tenant_id);
            results.status = "ERROR";
            results.data = null;
            res.status(200).send(results);   
            return;
        }
        contact_arr = [];
        for (var i = 0; i < data.data.length ; i++) { 
    
            for (var j = 0; j < data.data[i].Contacts.length ; j++) { 
                var contact = {};
                contact = data.data[i].Contacts[j];
                contact.client_uuid = data.data[i].UUID;
                contact.client_name = data.data[i].Name;
                contact.rfa_aml_status = null;
                contact.rfa_aml_result = null;
                contact.rfa_aml_url = null;
                contact.rfa_aml_type = null;
                contact.rfa_aml_dob = null;
                contact.rfa_aml_title = null;
                contact.rfa_aml_gender = null;
                contact.rfa_aml_middle_name = null;
                contact.rfa_aml_date_of_first_residence = null;
                contact.rfa_requestid = null;
                contact.rfa_update_date = null;
                contact.rfa_housenumber = null;
                contact.rfa_street = null;
                contact.rfa_city = null;
                contact.rfa_county = null;
                contact.rfa_postcode = null;
                contact.rfa_country = null;
          
                var customresults = await xero_pm_get_contact_custom_fields(access_token, tenant_id, data.data[i].Contacts[j].UUID);
                if (customresults.status !== "SUCCESS") {
                    console.log("📕: ERROR xero_pm_get_contact_custom_fields", access_token, tenant_id, data.data[i].Contacts[j].UUID);
                }
                else {
                    custom_fields_arr = customresults.data;
                    for (var x = 0; x < custom_fields_arr.length ; x++) { 
                        if (custom_fields_arr[x].Name == "RFA Status") contact.rfa_aml_status = custom_fields_arr[x].Value;
                        if (custom_fields_arr[x].Name == "RFA Result") contact.rfa_aml_result = custom_fields_arr[x].Value;
                        if (custom_fields_arr[x].Name == "RFA URL") contact.rfa_aml_url = custom_fields_arr[x].Value;
                        if (custom_fields_arr[x].Name == "RFA Type") contact.rfa_aml_type = custom_fields_arr[x].Value;
                        if (custom_fields_arr[x].Name == "RFA Date of Birth") contact.rfa_aml_dob = custom_fields_arr[x].Value;
                        if (custom_fields_arr[x].Name == "RFA Title") contact.rfa_aml_title = custom_fields_arr[x].Value;
                        if (custom_fields_arr[x].Name == "RFA Gender") contact.rfa_aml_gender = custom_fields_arr[x].Value;
                        if (custom_fields_arr[x].Name == "RFA Middle Name") contact.rfa_aml_middle_name = custom_fields_arr[x].Value;
                        if (custom_fields_arr[x].Name == "RFA Date of First Residence") contact.rfa_aml_date_of_first_residence = custom_fields_arr[x].Value;
                        if (custom_fields_arr[x].Name == "RFA Request Id") contact.rfa_requestid = custom_fields_arr[x].Value;
                        if (custom_fields_arr[x].Name == "RFA Update Date") contact.rfa_update_date = custom_fields_arr[x].Value;
                        if (custom_fields_arr[x].Name == "RFA House Name/Number") contact.rfa_housenumber = custom_fields_arr[x].Value;
                        if (custom_fields_arr[x].Name == "RFA Street") contact.rfa_street = custom_fields_arr[x].Value;
                        if (custom_fields_arr[x].Name == "RFA City") contact.rfa_city = custom_fields_arr[x].Value;
                        if (custom_fields_arr[x].Name == "RFA County") contact.rfa_county = custom_fields_arr[x].Value;
                        if (custom_fields_arr[x].Name == "RFA Postcode") contact.rfa_postcode = custom_fields_arr[x].Value;
                        if (custom_fields_arr[x].Name == "RFA Country") contact.rfa_country = custom_fields_arr[x].Value;
                    }
                }
                contact_arr.push(contact);
            }            
        }    
        contact_arr.sort((a, b) => {
            const priorityOrder = {
                "AWAITING": 1,
                "COMPLETED": 2,
                "": 3 // Default for null or other statuses
            };
            const statusA = a.rfa_aml_status || ""; // Default to empty string if null
            const statusB = b.rfa_aml_status || ""; // Default to empty string if null
            return (priorityOrder[statusA] || 3) - (priorityOrder[statusB] || 3);
        });
        results.status = "SUCCESS";
        results.data = contact_arr;
        res.status(200).send(results);   
    }
});
/****************************************************************************************************************************************************************/

function xero_pm_get_clients(ip_access_token, ip_tenant_id, ip_details) {

    return new Promise((resolve, reject) => {
        var url = XERO_PM_API_URL + "client.api/list";
        if (ip_details) url += "?detailedx=true";
        const options = {
            method  : 'GET', 
            url     : url,
            headers : { 'Content-Type' : 'application/json', 'Authorization' : `Bearer ${ip_access_token}`, 'Xero-tenant-id' : ip_tenant_id }
        };
        request(options, (error, response, body) => {
            var results = {};
            if (response.statusCode == 200) {
                console.log('📗: SUCCESS : xero_pm_get_clients');
                results.status = "SUCCESS";
                const clientList = parseXeroResponse(body);
                results.data = clientList;
                resolve(results);
                return;
            }
            console.error("📕: ERROR : xero_pm_get_clients", response.statusCode, body);
            results.status = "ERROR";
            results.data = null;
            resolve(results);
            return;
        }).catch(function (error) {
            console.error("📕: ERROR : xero_pm_get_clients - catch");
            var results = {};
            results.status = "ERROR";
            results.data = null;
            resolve(results);
            return;
        });
    });    
}
/*****************************************************************************************************************************************************************/

function parseXeroResponse(xmlString) {

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");
    const clients = [];
    const clientNodes = xmlDoc.getElementsByTagName("Client");

    for (let i = 0; i < clientNodes.length; i++) {
        const clientNode = clientNodes[i];
        const uuid = clientNode.getElementsByTagName("UUID")[0].textContent || "";
        const name = clientNode.getElementsByTagName("Name")[0].textContent || "";
        const address = clientNode.getElementsByTagName("Address")[0].textContent || "";
        const city = clientNode.getElementsByTagName("City")[0].textContent || "";
        const region = clientNode.getElementsByTagName("Region")[0].textContent || "";
        const country = clientNode.getElementsByTagName("Country")[0].textContent || "";
        const webUrl = clientNode.getElementsByTagName("WebUrl")[0].textContent || "";

        // Extract Contacts
        const contactNodes = clientNode.getElementsByTagName("Contact");
        const contacts = [];
        for (let j = 0; j < contactNodes.length; j++) {
            const contactNode = contactNodes[j];
            const contactUuid = contactNode.getElementsByTagName("UUID")[0].textContent || "";
            const contactName = contactNode.getElementsByTagName("Name")[0].textContent || "";
            const email = contactNode.getElementsByTagName("Email")[0].textContent || "";
            const position = contactNode.getElementsByTagName("Position")[0].textContent || "";
            const isPrimary = contactNode.getElementsByTagName("IsPrimary")[0].textContent === "Yes";
            const Phone = contactNode.getElementsByTagName("Phone")[0].textContent || "";
            const Mobile = contactNode.getElementsByTagName("Mobile")[0].textContent || "";
            contacts.push({
                UUID: contactUuid,
                Name: contactName,
                Email: email,
                Position: position,
                IsPrimary: isPrimary,
                Phone: Phone,
                Mobile : Mobile
            });
        }
        clients.push({
            UUID: uuid,
            Name: name,
            Address: address,
            City: city,
            Region: region,
            Country: country,
            WebUrl: webUrl,
            Contacts: contacts,
        });
    }
    return clients;
}
/*****************************************************************************************************************************************************************/

exports.XERO_billing_subscriptions_webhook = functions.runWith(runtimeOpts128).region('europe-west1').https.onRequest(async (req, res) => {

    console.log("📘📘📘: Start :📘📘📘");

    setResponseHeaders(res); // Set CORS headers
    if (req.method === 'OPTIONS') res.status(204).send('');
    else {
        if (!verifyXeroWebhook(req)) {
            console.error('Unauthorized - Invalid Signature');
            return res.status(401).send('Unauthorized - Invalid Signature');
        }
        var xero_access_token_non_tenant = null;
        var results = await xero_get_access_token_non_tenant();
        if (results.status == "SUCCESS") {
            console.log("📗: SUCCESS : xero_get_access_token_non_tenant");
            xero_access_token_non_tenant = results.access_token;
        }
        else {
            console.log("📕: ERROR xero_get_access_token_non_tenant");
            return res.status(401).send('Error - xero_get_access_token_non_tenant');
        }
        const events = req.body.events;
        events.forEach(async event => {

            console.log("📘: Process Event - eventType", event.eventType, "event.resourceUrl", event.resourceUrl);
            var results = await xero_get_subcriptions(xero_access_token_non_tenant, event.resourceUrl);
            console.log("📘 results", results);    
            
            if (results.status !== "SUCCESS") {
                console.log("📕: ERROR xero_get_subcriptions", xero_access_token_non_tenant, event.resourceUrl);
            }
            else {
                console.log("📗: SUCCESS : xero_get_subcriptions");  
                var sub_details = xero_get_current_sub_details(results.data);
                console.log("📘 sub_details", sub_details);                    

                // Output

                //sub_details {
                //    currentPeriodStart: '2024-08-22T08:14:51.153386',
                //    currentPeriodEnd: '2024-09-22T08:14:51.153386',
                //    monthly_credits: 10,
                //    status: 'ACTIVE',
                //    endDate: null
                // }
                              
                var customer = {};
                customer.tenantid               = results.data.organisationId;
                customer.sub_resourceUrl        = event.resourceUrl;
                customer.sub_subscriptionId     = results.data.subscriptionId;
                customer.sub_startDate          = results.data.startDate;
                customer.sub_endDate            = results.data.endDate;
                customer.sub_currentPeriodStart = results.data.currentPeriodStart;
                customer.sub_currentPeriodEnd   = results.data.currentPeriodEnd;
                customer.sub_status             = results.data.status;
                console.log("📘 customer", customer);    

                admin.database().ref(XERO_FB_TABLE + "/" + customer.tenantid).update({

                    sub_resourceUrl        : customer.sub_resourceUrl,
                    sub_subscriptionId     : customer.sub_subscriptionId,
                    sub_endDate            : customer.sub_endDate,
                    sub_currentPeriodStart : customer.sub_currentPeriodStart,
                    sub_currentPeriodEnd   : customer.sub_currentPeriodEnd,
                    sub_status             : customer.sub_status,
                    sub_plan_name          : sub_details.plan_name,
                    creditcounter          : sub_details.monthly_credits,
                    creditlimit            : sub_details.monthly_credits
                });
            }
        });
        res.status(200).send('Webhook received successfully');
    }
});
/****************************************************************************************************************************************************************/

function xero_get_current_sub_details(ip_data) {

    // Get current subscription details
    var subitems_arr = ip_data.subscriptionItems;
    var sub_details = {};
    sub_details.currentPeriodStart = ip_data.currentPeriodStart;
    sub_details.currentPeriodEnd   = ip_data.currentPeriodEnd;
    sub_details.monthly_credits    = 0;
    sub_details.status             = null;
    sub_details.endDate            = null;
    sub_details.plan_name          = "n/a";

    // Determine active and monthly credits
    for (var i = 0; i < subitems_arr.length ; i++) { 
        if (subitems_arr[i].status == XERO_PLAN_STATUS_ACTIVE) {
            console.log("📘 FOUND Active", subitems_arr[i].plan.name);    
            if (subitems_arr[i].plan.name.includes(XERO_PLAN_NAME_TEST))   sub_details.monthly_credits = XERO_PLAN_TEST;            
            if (subitems_arr[i].plan.name.includes(XERO_PLAN_NAME_GOLD))   sub_details.monthly_credits = XERO_PLAN_GOLD;            
            if (subitems_arr[i].plan.name.includes(XERO_PLAN_NAME_SILVER)) sub_details.monthly_credits = XERO_PLAN_SILVER;
            if (subitems_arr[i].plan.name.includes(XERO_PLAN_NAME_BRONZE)) sub_details.monthly_credits = XERO_PLAN_BRONZE;
            sub_details.plan_name = subitems_arr[i].plan.name;
            sub_details.status = XERO_PLAN_STATUS_ACTIVE;
            sub_details.endDate = subitems_arr[i].endDate;
            break;
        }
    }
    // Renew credits
    if (sub_details.endDate === null) {
        console.log("📘 No end date, so subscription is still active");      
    }
    return sub_details;
}
/*****************************************************************************************************************************************************************/

function verifyXeroWebhook(req) {
                            
    const xeroWebhookKey = 'IkWoryiAjkYLUXOqKM2GNMD7faysSdhkDmMeOyCCxMF51Wb5AbWUrR/SMlJ9F1IxQQ44d0vA9psEWmZ3jZERfA==';
    const signature = req.get('x-xero-signature');
    const rawBody = req.rawBody.toString();
    const hmac = crypto.createHmac('sha256', xeroWebhookKey).update(rawBody).digest('base64');
    return signature === hmac;
}
/****************************************************************************************************************************************************************/

function xero_get_access_token_non_tenant() {

    return new Promise((resolve, reject) => {
        var options = {
            'method'  : 'POST',
            'url'     : 'https://identity.xero.com/connect/token',
            'headers' : { 'Content-Type'  : 'application/x-www-form-urlencoded', 'authorization' : 'Basic ' + encodeToBase64(XERO_CLIENT_ID + ':' + XERO_CLIENT_SECRET), },
            formData  : { 'grant_type' : 'client_credentials', 'scope' : 'marketplace.billing' }
        };
        var results = {};
        request(options, (error, response, body) => {
            if (error) {
                console.error("📕: ERROR : xero_get_access_token_non_tenant: CATCH", error);
                //return reject('Failed to refresh access token');
                results.status = "ERROR";
                resolve(results);
                return;
            }
            if (response.statusCode !== 200) {
                console.error("📕: ERROR : xero_get_access_token_non_tenant: CATCH", response.statusCode, body);
                //return reject('Failed to refresh access token');
                results.status = "ERROR";
                resolve(results);
                return;
            }
            const data = JSON.parse(body);
            results.status = "SUCCESS";
            results.access_token = data.access_token;
            results.expiresIn = data.expires_in;
            resolve(results);
            return;
        }).catch(function (error) {
            console.log("📕: ERROR xero_get_access_token_non_tenant - catch : ");
            results.status = "ERROR";
            resolve(results);
            return;
        });
    });
}
/****************************************************************************************************************************************************************/

function xero_get_subcriptions(ip_access_token, ip_resourceUrl) {

    console.log("📘: xero_get_subcriptions", ip_resourceUrl);
    return new Promise((resolve, reject) => {
        const options = {
            method  : 'GET',
            url     : ip_resourceUrl,
            headers : { 'Content-Type' : 'application/json', 'Authorization' : `Bearer ${ip_access_token}` }
        };
        request(options, (error, response, body) => {
            var results = {};
            if (response.statusCode == 200) {
                console.log('📗: SUCCESS : xero_get_subcriptions');
                const data = JSON.parse(body);
                results.status = "SUCCESS";
                results.data = data;
                resolve(results);
                return;
            }
            console.error("📕: ERROR : xero_get_subcriptions", response.statusCode, body, url);
            results.status = "ERROR";
            results.data = null;
            resolve(results);
            return;
            
        }).catch(function (error) {
            console.error("📕: ERROR : xero_get_subcriptions - catch", url);
            var results = {};
            results.status = "ERROR";
            results.data = null;
            resolve(results);
            return;
        });
    });    
}
/*****************************************************************************************************************************************************************/

exports.XERO_aml_create_history = functions.runWith(runtimeOpts128).region('europe-west1').https.onRequest(async (req, res) => {

    var request = {};
    request.tenant_id    = req.query.tenant_id;
    request.contact_id   = req.query.contact_id;
    request.access_token = req.query.access_token;
    request.history      = req.query.history;
    console.log("📘: request", request);
    
    res.set('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
        res.set('Access-Control-Allow-Methods', 'GET');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
    } 
    else {
        // Create Xero Contact Note
        var results = {};
        var history = { Details: request.history };
        var historyresults = await xero_create_history(request.tenant_id, request.access_token, request.contact_id, history);
        console.log("📘: historyresults", historyresults);
        results.status = "SUCCESS";
        res.status(200).send(results);
    }
});
/****************************************************************************************************************************************************************/

exports.XERO_pm_aml_getdocument = functions.runWith(runtimeOpts256).region('europe-west1').https.onRequest(async (req, res) => {

    var request = {};
    request.requestid    = Number(req.query.requestid);
    //request.username     = req.query.username;
    //request.password     = req.query.password;
    request.tenant_id    = req.query.tenant_id;
    request.contact_id   = req.query.contact_id;
    request.access_token = req.query.access_token;
    request.filename     = req.query.filename;
    request.notemessage  = req.query.notemessage;
    console.log("📘: request", request);
    
    res.set('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
        res.set('Access-Control-Allow-Methods', 'GET');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
    } 
    else {
        // 21/05/2025 Get username and password
        var xero_account = await xero_get_account(request.tenant_id);    
        if (xero_account == "NODATA")	{
            console.error("📕: ERROR: xero_get_account", request.tenant_id);
            var results = { status: "ERROR", message: "xero_get_account"};
            res.status(200).send(results);
            return;
        }   
        request.username = xero_account.username;
        request.password = xero_account.password;
        console.log("📘: request.username", request.username, "request.password", request.password);
        // 21/05/2025 Get username and password

        var results = {};
        // GQL: Access token
        var tokenresults = await aml_get_accesstoken(request.username, request.password);
        if (tokenresults.status == "SUCCESS") {
            console.log("📗: SUCCESS: aml_get_accesstoken");    
        }
        else {
            console.log("📕: ERROR : aml_get_accesstoken");
            results.status = "ERROR";
            res.status(200).send(results);
            return;
        }
        // GQL: Document Id
        var docresults = await aml_getdocumentationid(tokenresults.accesstoken, request);
        if (docresults.status == "SUCCESS") {
            await new Promise(resolve => setTimeout(resolve, 5000)); // 5 sec

            var retry = 15     
            for (var i = 0; i < retry ;i++) 
            { 
                // GQL: Document URL
                var fileresults = await aml_get_document_filelocation(tokenresults.accesstoken, docresults.id);
                if (fileresults.status == "SUCCESS") {
                    console.log("📗: SUCCESS: aml_get_document_filelocation", fileresults.filelocation);
                    break;
                }
                else if (fileresults.status == "REQUESTED" || fileresults.status == "RUNNING") {
                    console.log("📘: WAIT : 5 Seconds");
                    await new Promise(resolve => setTimeout(resolve, 5000)); // 5 sec
                }
                else {
                    console.log("📕: ISSUE! : Waited 150 seconds");
                    break;
                }
            }
            console.log("📘: results.filelocation", fileresults.filelocation);

            if (fileresults.filelocation) {
                var convertresults = await handleConversionAndAttachment(request, fileresults);
                console.log("📘: convertresults", convertresults);                
            }                              
        }
        results.status = "SUCCESS";
        res.status(200).send(results);
    }
});
/****************************************************************************************************************************************************************/

async function handleConversionAndAttachment(request, fileresults) {

    console.log("📘 handleConversionAndAttachment", request, fileresults);
    return new Promise(async (resolve) => {            
        try {
            const result = await convertapi.convert('pdfa', { File: fileresults.filelocation }, 'pdf'); // Convert the file to PDF/A
            console.log("📘 result.response.Files", result.response.Files);
            const fileDetails = result.response.Files[0];
            console.log('Download URL:', fileDetails.Url);
            var convertfilename = '/tmp/' + fileDetails.FileName;
            console.log("📘 convertfilename", convertfilename);
            await result.saveFiles('/tmp/'); // Save the converted file locally
            // Create attachment in Xero
            var xeroresults = await xero_pm_create_attachment(
                request.tenant_id,
                request.access_token,
                request.contact_id,
                request.filename,
                convertfilename,
            );
            console.log("📘: xeroresults", xeroresults);
            resolve("SUCCESS");
        } catch (error) {
            console.error("📕: Error during conversion or Xero attachment creation", error);
            resolve("ERROR");
        }
    });    
}
/****************************************************************************************************************************************************************/

async function xero_pm_create_attachment(ip_tenant_id, ip_access_token, ip_contact_id, ip_filename, ip_convertfilename) {
    
    return new Promise(async (resolve) => {            
        try {
            const fileContent = fs.readFileSync(ip_convertfilename);
            const base64Content = fileContent.toString("base64");
            const body = `
                <Document>
                    <ClientUUID>${ip_contact_id}</ClientUUID>
                    <Title>${path.basename(ip_filename, path.extname(ip_filename))}</Title>
                    <Text>Attached document</Text>
                    <Folder>AML Documents</Folder>
                    <FileName>${ip_filename}</FileName>
                    <Content>${base64Content}</Content>
                </Document>`;
            const apiResponse = await axios.post(`${XERO_PM_API_URL}client.api/document`, body, { headers: { "Content-Type": "application/xml", Authorization: `Bearer ${ip_access_token}`, "Xero-tenant-id": ip_tenant_id, }, } );
            if (apiResponse.status === 200) {
                console.log("📗: SUCCESS: xero_pm_create_attachment");
                resolve("SUCCESS");
            } else {
                console.error("📕: ERROR: xero_pm_create_attachment", apiResponse.status, apiResponse.data);
                resolve("ERROR");
            }
        } catch (error) {
            console.error("📕: ERROR: xero_pm_create_attachment - catch", error.message);
            resolve("ERROR");
        }
    });
}
/****************************************************************************************************************************************************************/

exports.XERO_aml_getdocument = functions.runWith(runtimeOpts128).region('europe-west1').https.onRequest(async (req, res) => {

    var request = {};
    request.requestid    = Number(req.query.requestid);
    //request.username     = req.query.username;
    //request.password     = req.query.password;
    request.tenant_id    = req.query.tenant_id;
    request.contact_id   = req.query.contact_id;
    request.access_token = req.query.access_token;
    request.filename     = req.query.filename;
    request.notemessage  = req.query.notemessage;
    console.log("📘: request", request);
    
    res.set('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
        res.set('Access-Control-Allow-Methods', 'GET');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
    } 
    else {
        // 21/05/2025 Get username and password
        var xero_account = await xero_get_account(request.tenant_id);    
        if (xero_account == "NODATA")	{
            console.error("📕: ERROR: xero_get_account", request.tenant_id);
            var results = { status: "ERROR", message: "xero_get_account"};
            res.status(200).send(results);
            return;
        }   
        request.username = xero_account.username;
        request.password = xero_account.password;
        console.log("📘: request.username", request.username, "request.password", request.password);
        // 21/05/2025 Get username and password
        
        var results = {};
        // GQL: Access token
        var tokenresults = await aml_get_accesstoken(request.username, request.password);
        if (tokenresults.status == "SUCCESS") {
            console.log("📗: SUCCESS: aml_get_accesstoken");    
        }
        else {
            console.log("📕: ERROR : aml_get_accesstoken");
            results.status = "ERROR";
            res.status(200).send(results);
            return;
        }
        // GQL: Document Id
        var docresults = await aml_getdocumentationid(tokenresults.accesstoken, request);
        if (docresults.status == "SUCCESS") {
            await new Promise(resolve => setTimeout(resolve, 5000)); // 5 sec

            var retry = 15     
            for (var i = 0; i < retry ;i++) 
            { 
                // GQL: Document URL
                var fileresults = await aml_get_document_filelocation(tokenresults.accesstoken, docresults.id);
                if (fileresults.status == "SUCCESS") {
                    console.log("📗: SUCCESS: aml_get_document_filelocation", fileresults.filelocation);
                    break;
                }
                else if (fileresults.status == "REQUESTED" || fileresults.status == "RUNNING") {
                    console.log("📘: WAIT : 5 Seconds");
                    await new Promise(resolve => setTimeout(resolve, 5000)); // 5 sec
                }
                else {
                    console.log("📕: ISSUE! : Waited 150 seconds");
                    break;
                }
            }
            console.log("📘: results.filelocation", fileresults.filelocation);

            if (fileresults.filelocation) {
                // Create Xero Contact Note
                var history = { Details: request.notemessage };
                var historyresults = await xero_create_history(request.tenant_id, request.access_token, request.contact_id, history);
                // Create Xero Contact Attachment
                var xeroresults = await xero_create_attachment(request.tenant_id, request.access_token, request.contact_id, fileresults.filelocation, request.filename);
                console.log("📘: xeroresults", xeroresults);   
            }                              
        }
        results.status = "SUCCESS";
        res.status(200).send(results);
    }
});
/****************************************************************************************************************************************************************/

function aml_get_accesstoken(ip_username, ip_password, ip_dev) {

    return new Promise(resolve => {

        // 13/01/2025
        /*
        var amlquery = 'mutation signIn { signIn(credentials: { userName: "' + ip_username + '", password: "'+ ip_password + '" }) { accessToken refreshToken expiresInSeconds } }';
        var options = {
            'method'  : 'POST', 
            'url'     : RFA_GRAPHQL_URL,
            'headers' : { 'Content-Type' : 'application/json' },  
            body      : JSON.stringify({ query : amlquery, variables : {} })
        };
        */
        
        const graphql = JSON.stringify({
            query: `mutation signIn($credentials: SignInCredentialsInput, $useManagementflow: Boolean) {
            signIn(credentials: $credentials, useManagementflow: $useManagementflow) { accessToken refreshToken expiresInSeconds }
            }`, variables: { credentials: { userName: ip_username, password: ip_password, }, useManagementflow: true, },
        });

        // Live or Dev
        var url = RFA_GRAPHQL_URL;
        if (ip_dev) url = RFA_GRAPHQL_URL;
        console.log("📘: url", url);                           

        const options = {
            url     : url,
            method  : "POST",
            headers : { "Content-Type": "application/json" },
            body    : graphql,
        };
        // 13/01/2025

        request(options, function (error, response) {
            if (error) throw new Error(error);
            var body = JSON.parse(response.body);
            if (body.data) {
                var results = {};
                results.status = "SUCCESS";
                results.accesstoken = body.data.signIn.accessToken;
            }
            else {
                console.log("📕: ERROR : aml_get_accesstoken", ip_username, ip_password);
                var results = {};
                results.status = "ERROR";
            }
            resolve(results);    
            return;
        }).catch((error) => {
            console.log("📕: ERROR : aml_get_accesstoken : CATCH", ip_username, ip_password);
            var results = {};
            results.status = "ERROR";
            resolve(results);    
            return;
        });
    });
}
/*******************************************************************************************************************************************************************************/

function aml_getdocumentationid(ip_accesstoken, ip_request) {

    return new Promise(resolve => {
        var amlquery = "mutation fileExportRequest($fileRequest: FileExportRequestInput) {\n  fileExportRequest(fileExportRequest: $fileRequest) {\n    id\n    __typename\n  }\n}\n";
        var amlvariables = {
            "fileRequest": {
                "relativePath": "/app/idv/check/pdf/" + ip_request.requestid + "/",
                "description": "",
                "bearerToken": ip_accesstoken,
                "totalResults": 1,
                "exportType": "PDF"
            }
        }
        var options = { 
            'method'  : 'POST', 
            'url'     : RFA_GRAPHQL_URL, 
            'headers' : { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + ip_accesstoken }, 
            body      : JSON.stringify({ query : amlquery, variables : amlvariables })
        }
        var results = {};
        request(options, function (error, response) {
            if (error) throw new Error(error);
            var body = JSON.parse(response.body);
            if (body.data.fileExportRequest.id) {
                results.status = "SUCCESS";
                results.id = body.data.fileExportRequest.id;
                console.log("📗: SUCCESS : aml_getdocumentationid", results.id);
            }
            else {
                results.status = "ERROR";
                console.log("📕: ERROR : aml_getdocumentationid", ip_request);
            }
            resolve(results);    
            return;
        }).catch((error) => {
            results.status = "ERROR";
            console.log("📕: ERROR : aml_getdocumentationid : CATCH", ip_request);
            resolve(results);    
            return;
        });
    });
}
/*******************************************************************************************************************************************************************************/

function aml_get_document_filelocation(ip_accesstoken, ip_id) {

    return new Promise(resolve => {
        var amlquery = "query fileExports($id: String) { fileExports( where: { id: {  eq: $id } }) { items { status acknowledged downloadLocation id timestamp meta { pdf { companyName companyNumber countryCode } } rowCount __typename } __typename } }";
        var amlvariables = { "id" : ip_id };
        var options = { 
            'method'  : 'POST', 
            'url'     : RFA_GRAPHQL_URL, 
            'headers' : { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + ip_accesstoken }, 
            body      : JSON.stringify({ query : amlquery, variables : amlvariables })
        }
        var results = {};
        request(options, function (error, response) {
            if (error) throw new Error(error);
            var body = JSON.parse(response.body);
            if (body.data) {
                if (body.data.fileExports.items) {
                    if (body.data.fileExports.items[0].status == "COMPLETED") {
                        results.status = "SUCCESS";
                        results.filelocation = body.data.fileExports.items[0].downloadLocation;
                        console.log("📗: SUCCESS : aml_get_document_filelocation");
                    }
                    else {
                        results.status = body.data.fileExports.items[0].status;
                        console.log("📕: NOT READY - Status", results.status);
                    }
                }
            }
            else {
                results.status = "ERROR";
                console.log("📕: ERROR : aml_get_document_filelocation", ip_id);
            }
            resolve(results);    
            return;
        }).catch((error) => {
            results.status = "ERROR";
            console.log("📕: ERROR : aml_get_document_filelocation : CATCH", ip_id);
            resolve(results);    
            return;
        });
    });
}
/*******************************************************************************************************************************************************************************/

function xero_create_attachment(ip_tenant_id, ip_access_token, ip_contact_id, ip_filelocation, ip_filename) {

    return new Promise(async (resolve) => {    
        console.log("📘: xero_create_attachment- ip_tenant_id", ip_tenant_id);        
        console.log("📘: ip_access_token", ip_access_token);        
        console.log("📘: ip_contact_id", ip_contact_id);        
        console.log("📘: ip_filelocation", ip_filelocation);      
        console.log("📘: ip_filename", ip_filename);      

        // FILE : Create the pdf document locally and wait 2 seconds
        var filename = await filewrite(ip_filelocation);

        // Read the file to be uploaded
        const fileStream = fs.createReadStream(filename);
        await new Promise(resolve => setTimeout(resolve, 6000)); // Wait 6 seconds to write file!

        var url = XERO_API_URL + "/Contacts/" + ip_contact_id + "/Attachments/" + ip_filename;
        const options = {
            method  : 'PUT',
            url     : url,
            headers : { 'Content-Type' : 'application/pdf', 'Authorization' : `Bearer ${ip_access_token}`, 'xero-tenant-id' : ip_tenant_id, 'Content-Disposition': `attachment; filename="${ip_filename}"` },
            body    : fileStream
        };
        console.log("📘: options", options);

        request(options, (error, response, body) => {
            var results = {};
            if (response.statusCode == 200 || response.statusCode == 201) {
                console.log('📗: SUCCESS : xero_create_attachment');
                const data = JSON.parse(body);
                console.log("📘: data", data);
                results.status = "SUCCESS";
                resolve(results);
                return;
            }
            console.error("📕: ERROR : xero_create_attachment", response.statusCode, body, ip_tenant_id, ip_access_token, ip_contact_id);
            results.status = "ERROR";
            results.data = null;
            resolve(results);
            return;
        }).catch(function (error) {
            console.error("📕: ERROR : xero_create_attachment - catch", response.statusCode, body, ip_tenant_id, ip_access_token, ip_contact_id);
            results.status = "ERROR";
            results.data = null;
            resolve(results);
            return;
        });
    });
}
/*****************************************************************************************************************************************************************/

function filewrite(ip_fileurl) {

    return new Promise(async (resolve) => {
        var filename_arr = ip_fileurl.split("pdf");
        var filename = filename_arr[0] + "pdf";
        var filename_char_arr = filename.split("");
        for (var i = 0; i < filename_char_arr.length ;i++) { 
            if (filename_char_arr[i] == "/") var index = i;
        }
        var filename = "/tmp/" + filename.substring(index+ 1, filename_char_arr.length);
        var file = request(ip_fileurl).pipe(fs.createWriteStream(filename));
        await new Promise(resolve => setTimeout(resolve, 6000)); // Wait 6 seconds to write file!
        resolve(filename);
    });        
}
/*****************************************************************************************************************************************************************/

function xero_create_history(ip_tenant_id, ip_access_token, ip_contact_id, ip_history) {

    return new Promise((resolve, reject) => {
        var url = XERO_API_URL + "/Contacts/" + ip_contact_id + "/history";
        const options = {
            method  : 'PUT',
            url     : url,
            headers : { 'Content-Type' : 'application/json', 'Authorization' : `Bearer ${ip_access_token}`, 'xero-tenant-id' : ip_tenant_id },
            body    : JSON.stringify(ip_history)
        };
        request(options, (error, response, body) => {
            var results = {};
            if (response.statusCode == 200) {
                console.log('📗: SUCCESS : xero_create_history');
                const data = JSON.parse(body);
                results.status = "SUCCESS";
                resolve(results);
                return;
            }
            console.error("📕: ERROR : xero_create_history", response.statusCode, body, ip_tenant_id, ip_access_token, ip_contact_id, url);
            results.status = "ERROR";
            results.data = null;
            resolve(results);
            return;
        }).catch(function (error) {
            console.error("📕: ERROR : xero_create_history - catch", response.statusCode, body, ip_tenant_id, ip_access_token, ip_contact_id, url);
            results.status = "ERROR";
            results.data = null;
            resolve(results);
            return;
        });
    });
}
/*****************************************************************************************************************************************************************/

function xero_get_contacts(ip_tenant_id, ip_access_token, ip_search_string, ip_contact_id) {

    return new Promise((resolve, reject) => {
        var url = XERO_API_URL + "/Contacts";
        if (ip_search_string) url += "?where=" + 'Name.Contains("' + ip_search_string + '")';    
        if (ip_contact_id) url += "/" + ip_contact_id;  
        const options = {
            method  : 'GET',
            url     : url,
            headers : { 'Content-Type' : 'application/json', 'Authorization' : `Bearer ${ip_access_token}`, 'xero-tenant-id' : ip_tenant_id }
        };
        request(options, (error, response, body) => {
            var results = {};
            if (response.statusCode == 200) {
                console.log('📗: SUCCESS : xero_get_contacts');
                const data = JSON.parse(body);
                results.status = "SUCCESS";
                results.data = data.Contacts;
                resolve(results);
                return;
            }
            console.error("📕: ERROR : xero_get_contacts", response.statusCode, body, ip_tenant_id, ip_access_token, ip_search_string, ip_contact_id, url);
            results.status = "ERROR";
            results.data = null;
            resolve(results);
            return;
        }).catch(function (error) {
            console.error("📕: ERROR : xero_get_contacts - catch", response.statusCode, body, ip_tenant_id, ip_access_token, ip_search_string, ip_contact_id, url);
            results.status = "ERROR";
            results.data = null;
            resolve(results);
            return;
        });
    });
}
/*****************************************************************************************************************************************************************/

function xero_getaccesstoken(ip_xero) {

    return new Promise((resolve, reject) => {
        var options = {
            'method'  : 'POST',
            'url'     : 'https://identity.xero.com/connect/token?=',
            'headers' : { 'Content-Type'  : 'application/x-www-form-urlencoded', 'authorization' : 'Basic ' + encodeToBase64(XERO_CLIENT_ID + ':' + XERO_CLIENT_SECRET), 'grant_type' : 'refresh_token', },
            formData : {
              'grant_type'    : 'refresh_token',
              'refresh_token' : ip_xero.refresh_token,
              'client_id'     : XERO_CLIENT_ID,
              'client_secret' : XERO_CLIENT_SECRET
            }
        };
        var results = {};
        request(options, (error, response, body) => {
            if (error) {
                console.error("📕: ERROR : getAccessToken: CATCH", error);
                results.status = "ERROR";
                resolve(results);
                return;
            }
            if (response.statusCode !== 200) {
                console.error("📕: ERROR : getAccessToken: CATCH", response.statusCode, body);
                results.status = "ERROR";
                resolve(results);
                return;
            }
            const data = JSON.parse(body);
            results.status = "SUCCESS";
            results.access_token = data.access_token;
            results.refresh_token = data.refresh_token;
            results.expiresIn = data.expires_in;
            resolve(results);
            return;
        }).catch(function (error) {
            console.log("📕: ERROR xero_getaccesstoken - catch : ", ip_xero);
            results.status = "ERROR";
            resolve(results);
            return;
        });
    });
}
/****************************************************************************************************************************************************************/

function encodeToBase64(str) {
    return Buffer.from(str).toString('base64');
}
/****************************************************************************************************************************************************************/

function xero_get_connections(ip_access_token) {

    const XERO_API_URL = 'https://api.xero.com/connections';
    return new Promise((resolve, reject) => {
        const options = {
            method  : 'GET',
            url     : XERO_API_URL,
            headers : { 'Content-Type' : 'application/json', 'Authorization' : `Bearer ${ip_access_token}` }
        };
        request(options, (error, response, body) => {
            if (error) {
                console.error("📕: ERROR : getOrganizationDetails: CATCH", error);
                return reject('Failed to fetch organization details');
            }
            if (response.statusCode !== 200) {
                console.error("📕: ERROR : getOrganizationDetails: CATCH", response.statusCode, body);
                return reject('Failed to fetch organization details');
            }
            const data = JSON.parse(body);
            resolve(data);
        });
    });
}
/****************************************************************************************************************************************************************/

exports.XERO_oauth = functions.runWith(runtimeOpts128).region('europe-west1').https.onRequest(async (req, res) => {

    console.log("📗📗📗: START Updated - 14/02/2025 :📗📗📗");

    const auth_code = req.query.code;
    console.log("📘: auth_code", auth_code);   

    const user_uid = req.query.state;
    console.log("📘: user_uid", user_uid);   

    var userresults = await firebase_get_xero_user(user_uid); // FIREBASE - Get user from XERO_user
    console.log("📘: firebase_get_xero_user - results", userresults);

    var xero_type = userresults.account_type; 
    console.log("📘: xero_type", xero_type);   

    var rfa_user_created = "no";
    var new_install      = "no";

    setResponseHeaders(res); // Set CORS headers
    if (req.method === 'OPTIONS') res.status(204).send('');
    else {
        if (!auth_code) {
            var html = '<div style="display: flex; justify-content: center; align-items: center; height: 100vh; text-align: center; flex-direction: column;"><p style="font-size: 20px;">Authorisation Cancelled.</p><br>' +
            '<a href="https://rfa-xero-aml-791aa.web.app" target="_blank" style="display: inline-block; padding: 10px 20px; font-size: 16px; text-align: center; text-decoration: none; color: #FFFFFF; background-color: #007BFF; border: none; border-radius: 5px; cursor: pointer;">Return to Sign Up</a></div>';
            res.status(200).send(html);   
            return;
        }
        var xero = {};
        xero.code             = auth_code;
        xero.tokenEndpoint    = XERO_TOKEN_URL;
        xero.XERO_CLIENT_ID   = XERO_CLIENT_ID;
        xero.XERO_SECRET_ID   = XERO_CLIENT_SECRET;
        xero.XERO_REDIRECTURI = XERO_CLIENT_REDIRECT;

        var installdate = moment().format('DD/MM/YYYY');
        var emailmessage = '<p style="font-size: 16px;">NEW ' + xero_type + ' Installation Date: <strong>' + installdate + '</strong></p>';

        var results = await CRM_xero_auth(xero);
        if (results.status == "SUCCESS") {

            console.log('📗: STEP 1 : SUCCESS : CRM_xero_auth - results', results);

            if (user_uid == "openid") {

                const open_id_decoded = decodeJWT(results.id_token);
                console.log("📘: MODE : openid - open_id_decoded", open_id_decoded);
                var email = "";
                if (open_id_decoded.email) email = open_id_decoded.email;
                var firstname = "";
                if (open_id_decoded.given_name) firstname = open_id_decoded.given_name;
                var lastname  = "";
                if (open_id_decoded.family_name) lastname  = open_id_decoded.family_name;
                var html = '<div style="display: flex; justify-content: center; align-items: center; height: 100vh; text-align: center; flex-direction: column;"><p style="font-size: 20px;">User details retrieved successfully.</p><br>' +
                    '<a href="https://rfa-xero-aml-791aa.web.app/?api=Ju41sjvJbSFVb9c7tFqbRoCczA6WgrSyhuJfaCQ7TOUKXY04IGHcyCHKVnHyaT7o&tenantId=openid&firstname=' + firstname + '&lastname=' + lastname + '&email=' + email + '" target="_blank" style="display: inline-block; padding: 10px 20px; font-size: 16px; text-align: center; text-decoration: none; color: #FFFFFF; background-color: #007BFF; border: none; border-radius: 5px; cursor: pointer;">Return to Sign Up</a></div>';
                console.log("📗📗📗: openid FINISHED :📗📗📗");
                res.status(200).send(html);   
                return;
            }

            const accesstoken_decoded = decodeJWT(results.access_token);
            console.log("📘📘: accesstoken_decoded", accesstoken_decoded);
            const authentication_event_id = accesstoken_decoded.authentication_event_id;
            console.log("📘📘: authentication_event_id", authentication_event_id);

            if (xero_type == "PRACTICEMANAGER") {

                //var status = "<p style='font-size:20px;text-align:center;'><br><br><br>Red Flag Alert - Xero App has been connected successfully to your Xero Practice Manager.<br><br><p style='font-size:20px;text-align:center;'><br><br><br>Please close this window, Logout and login again.<br><br>";
                var status = '<div style="display: flex; justify-content: center; align-items: center; height: 100vh; text-align: center; flex-direction: column;">' +
                    '<p style="font-size: 20px;">Red Flag Alert - Xero App has been connected successfully.<br><br>For any support, please contact us at:<br><br>' +
                    '0330 460 9877 or email: <a href="mailto:helpdesk@redflagalert.com" style="text-decoration: none; color: #007BFF;">helpdesk@redflagalert.com</a><br><br></p>' +
                    '<a href="https://rfa-xero-aml-791aa.web.app/' + 'target="_blank" style="display: inline-block; padding: 10px 20px; font-size: 16px; text-align: center; text-decoration: none; color: #FFFFFF; background-color: #007BFF; border: none; border-radius: 5px; cursor: pointer;">Open Our Red Flag Alert Xero App</a></div>';

                }
            console.log("📘: results.scope", results.scope);               

            var customer = {};
            customer.access_token     = results.access_token;
            customer.refresh_token    = results.refresh_token;
            customer.scope            = results.scope;
            customer.firstname        = "";
            customer.lastname         = "";
            customer.email            = "";
            customer.shortcode        = "";
            customer.organisationrole = "";
            if (xero_type == "PRACTICEMANAGER") customer.tenanttype = xero_type;
            else customer.tenanttype = 'ORGANISATION';

            var xeroresults = await xero_get_connections(customer.access_token);
            console.log('📗: STEP 2 : SUCCESS : xero_get_connections - xeroresults', xeroresults);

            for (i = 0; i < xeroresults.length; i++) 
            {
                // 24/02/2025
                if (xeroresults[i].authEventId == authentication_event_id) {
                    console.log("📘📘: MATCHED event_id", xeroresults[i].tenantName);
                    customer.tenantid     = xeroresults[i].tenantId;
                    customer.tenantname   = xeroresults[i].tenantName;
                    customer.tenanttype   = xeroresults[i].tenantType;
                    customer.connectionid = xeroresults[i].id;  
                    break; 
                }
                // 24/02/2025

                if (xeroresults[i].tenantType == customer.tenanttype) {
                    customer.tenantid     = xeroresults[i].tenantId;
                    customer.tenantname   = xeroresults[i].tenantName;
                    customer.tenanttype   = xeroresults[i].tenantType;
                    customer.connectionid = xeroresults[i].id;              // 03/02/2025 Store for disconnection
                    //break; // 10/02/2025
                }
            }
            console.log("📘: customer", customer);
         
            // Only for Standard Xero
            if (customer.tenanttype == 'ORGANISATION') {

                // 22/01/2025 Moved here added button to lunch Xero App with tenant id
                var status = '<div style="display: flex; justify-content: center; align-items: center; height: 100vh; text-align: center; flex-direction: column;">' +
                    '<p style="font-size: 20px;">Red Flag Alert - Xero App has been connected successfully.<br><br>For any support, please contact us at:<br><br>' +
                    '0330 460 9877 or email: <a href="mailto:helpdesk@redflagalert.com" style="text-decoration: none; color: #007BFF;">helpdesk@redflagalert.com</a><br><br></p>' +
                    '<a href="https://rfa-xero-aml-791aa.web.app/?api=Ju41sjvJbSFVb9c7tFqbRoCczA6WgrSyhuJfaCQ7TOUKXY04IGHcyCHKVnHyaT7o&tenantId=' + customer.tenantid + '" ' +
                    'target="_blank" style="display: inline-block; padding: 10px 20px; font-size: 16px; text-align: center; text-decoration: none; color: #FFFFFF; background-color: #007BFF; border: none; border-radius: 5px; cursor: pointer;">Open Our Red Flag Alert Xero App</a></div>';

                const decoded = decodeJWT(customer.access_token);
                const xero_user_id = decoded.xero_userid;
                console.log("📘: GLOBAL xero_user_id", xero_user_id);
            
                var results = await xero_get_user(customer.tenantid, customer.access_token);
                if (results.status == "SUCCESS") {
                    console.log("📗: SUCCESS : xero_get_user");
                    var users_arr = results.data;
                    for (i = 0; i < users_arr.length; i++) 
                    {
                        if (users_arr[i].GlobalUserID == xero_user_id) {
                            customer.firstname        = users_arr[i].FirstName;
                            customer.lastname         = users_arr[i].LastName;
                            customer.email            = users_arr[i].EmailAddress; // username is email
                            customer.organisationrole = users_arr[i].OrganisationRole;
                            break;
                        }
                    }
                }
                else console.log("📕: ERROR xero_get_user", customer.tenantid);
              
                var orgresults = await xero_get_organisation(customer.tenantid, customer.access_token);
                if (orgresults.status == "SUCCESS") {
                    console.log("📗: SUCCESS : xero_get_organisation");
                    if (orgresults.data.Organisations) customer.shortcode =  orgresults.data.Organisations[0].ShortCode;
                }
                else console.log("📕: ERROR xero_get_organisation", customer.tenantid, customer.access_token);
            }
            //
            // Create RFA AML User: START
            //

            /*            
            customer.username = null;
            customer.password = null;
            var user = null;
            if (customer.tenanttype == 'ORGANISATION') {
                var user = { 
                    firstname : customer.firstname, 
                    lastname  : customer.lastname, 
                    email     : customer.email 
                };
                var rfaresults = await rfa_create_user(user);
                if (rfaresults.status == "SUCCESS") {
                    console.log("📗: STEP 3 : SUCCESS : rfa_create_user - password", rfaresults.password);
                    customer.username = user.email;
                    customer.password = rfaresults.password;
                }
                else {
                    console.log("📕: ERROR: rfa_create_user");
                    // Email ERROR
                    var failsubject = "Xero App NEW Installation - ORGANISATION " + customer.tenantname + " ERROR Creating RFA user";
                    var failemailmessage = '<p style="font-size: 16px;">customer.firstname: <strong>' + customer.firstname + '</strong></p>' +
                        '<p style="font-size: 16px;">customer.lastname: <strong>' + customer.lastname + '</strong></p>' +
                        '<p style="font-size: 16px;">customer.email: <strong>' + customer.email + '</strong></p>';
                    email_send(failsubject, failemailmessage);
                }
            }
            else {
                // PRACTICE MANAGER
            */            

                // FIREBASE - Get user from XERO_user
                //var userresults = await firebase_get_xero_user(user_uid);
                //console.log("📘: firebase_get_xero_user - results", userresults);

            if (userresults.username) {
                console.log("📗: SUCCESS : firebase_get_xero_user", userresults);  
                var user = { 
                    firstname : userresults.firstname,
                    lastname  : userresults.lastname,
                    email     : userresults.username 
                };

                if (userresults.rfa_user_created == "yes") {        // 14/02/2025
                // Account has already been linked
                //if (userresults.tenantid) {
                    console.log("📘: RFA User already created");   
                }
                else {

                    console.log("📘: RFA Create new user");   

                    var rfaresults = await rfa_create_user(user);
                    if (rfaresults.status == "SUCCESS") {
                        console.log("📗: SUCCESS : rfa_create_user - password", rfaresults.password);
                        customer.username = user.email;
                        customer.password = rfaresults.password;
                        rfa_user_created = "yes";
                    }
                    else {
                        console.log("📕: ERROR: rfa_create_user");    

                        // Email: Error
                        var failsubject = "Xero App NEW Installation - " + xero_type + "  " + customer.tenantname + " ERROR Creating RFA user";
                        var failemailmessage = '<p style="font-size: 16px;">customer.firstname: <strong>' + customer.firstname + '</strong></p>' +
                            '<p style="font-size: 16px;">customer.lastname: <strong>' + customer.lastname + '</strong></p>' + '<p style="font-size: 16px;">customer.email: <strong>' + customer.email + '</strong></p>';
                        email_send(failsubject, failemailmessage);                                

                        // HTML RESULTS:
                        var subject = "Xero App NEW Installation FAILED ";
                        var status =  "<p style='font-size:20px;text-align:center;'><br><br><br>RedFlag Alert - Xero App Installation FAILED.<br><br>" + "For any support please contact us on<br><br>0330 460 9877<br><br>or<br><br>email: <a href='mailto:helpdesk@redflagalert.com'>helpdesk@redflagalert.com" + "<br><br><a href='https://www.xero.com/uk/'>Xero</a></p>";   
                        res.status(200).send(status);   
                        return;
                    }
                }
            }
            //}
            console.log("📘: RFA user details", user);      
            console.log("📘: UPDATE FIREBASE");      
            //
            // Create RFA AML User: END
            //
            customer.installdate = installdate;
            customer.aml_message = "Hello <firstname>, " + customer.tenantname + " need to identify you, please click the link to continue.";
            console.log("📘: customer", customer);
         
            var xero_account = await xero_get_account(customer.tenantid);    
            if (xero_account == "NODATA")	{

                new_install = "yes"; // 04/03/2025

                console.log("📘: XERO Account: Does not exist, create NEW one"); // New Firebase Database for User
                admin.database().ref(XERO_FB_TABLE + "/" + customer.tenantid).update({
                    access_token     : customer.access_token,  
                    refresh_token    : customer.refresh_token,
                    company_name     : customer.tenantname,
                    scope            : customer.scope,
                    installdate      : customer.installdate,
                    creditcounter    : XERO_CREDITCOUNTER,       
                    creditlimit      : XERO_CREDITLIMIT,       
                    lock             : "Enabled",             
                    firstname        : customer.firstname,
                    lastname         : customer.lastname,
                    email            : customer.email,
                    organisationrole : customer.organisationrole,
                    aml_message      : customer.aml_message,
                    username         : customer.username,
                    password         : customer.password,
                    short_code       : customer.shortcode,
                    tenanttype       : customer.tenanttype,
                    user_uid         : user_uid,
                    connectionid         : customer.connectionid,   // 03/02/2025
                    xero_disconnect_date : ""                       // 03/02/2025
                });

                firebase_update_xero_user(user_uid, customer.tenantid, rfa_user_created); // 25/02/2025              

                if (xero_type == "PRACTICEMANAGER") {

                    //firebase_update_xero_user(user_uid, customer.tenantid, rfa_user_created); // 25/02/2025

                    // XERO : Create custom fields    
                    var results = await xero_create_custom_fields(customer.access_token, customer.tenantid);
                    if (results == "SUCCESS") {
                        console.log("📗: SUCCESS : xero_create_custom_fields");
                    }
                    else {
                        console.log("📕: ERROR xero_create_custom_fields");

                        // Email : ERROR
                        var failsubject = "Xero App NEW Installation - " + customer.tenantname + " ERROR Creating custom fields";
                        var failemailmessage = '<p style="font-size: 16px;">customer.access_token: <strong>' + customer.access_token + '</strong></p>' + '<p style="font-size: 16px;">customer.tenantid: <strong>' + customer.tenantid + '</strong></p>';
                        email_send(failsubject, failemailmessage);
                    }

                }
                // Build email
                var subject = "Xero App NEW " + xero_type + " Installation COMPLETED - " + customer.tenantname;
                var emailmessage = 
                    '<p style="font-size: 16px;">Company Name: <strong>' + customer.tenantname + '</strong></p>' +                
                    '<p style="font-size: 16px;">New Installation Date: <strong>' + installdate + '</strong></p>' +
                    '<p style="font-size: 16px;">Credit Counter: <strong>' + XERO_CREDITCOUNTER + '</strong></p>' +
                    '<p style="font-size: 16px;">Credit Limit: <strong>' + XERO_CREDITLIMIT + '</strong></p>' +
                    '<p style="font-size: 16px;">First name: <strong>' + customer.firstname + '</strong></p>' +
                    '<p style="font-size: 16px;">Last name: <strong>' + customer.lastname + '</strong></p>' +
                    '<p style="font-size: 16px;">Email: <strong>' + customer.email + '</strong></p>' +
                    '<p style="font-size: 16px;">organisationrole: <strong>' + customer.organisationrole + '</strong></p>' +
                    '<p style="font-size: 16px;">AML Message: <strong>' + customer.aml_message + '</strong></p>' +
                    '<p style="font-size: 16px;">Xero Type: <strong>' + customer.tenanttype + '</strong></p>';
            }
            else {

                // FIREBASE : Update
                admin.database().ref(XERO_FB_TABLE + "/" + customer.tenantid).update({
                    access_token  : customer.access_token,  
                    refresh_token : customer.refresh_token,
                    company_name  : customer.tenantname,
                    scope         : customer.scope,
                    installdate   : installdate,
                    user_uid      : user_uid,
                    connectionid         : customer.connectionid, // 03/02/2025
                    xero_disconnect_date : ""                     // 03/02/2025

                });
                //if (xero_type == "PRACTICEMANAGER") firebase_update_xero_user(user_uid, customer.tenantid, rfa_user_created);     // 25/02/2025
                firebase_update_xero_user(user_uid, customer.tenantid, rfa_user_created);                                           // 25/02/2025

                // Build email
                var subject = "Xero App " + xero_type + " UPDATE Installation COMPLETED - " + customer.tenantname;
                var emailmessage = '<p style="font-size: 16px;">UPDATE Installation Date: <strong>' + installdate + '</strong></p><p style="font-size: 16px;">Xero Type: <strong>' + xero_type + '</strong></p>';
            }
        }
        else {
            var subject = "Xero App " + xero_type + " NEW Installation FAILED ";
            var status =  "<p style='font-size:20px;text-align:center;'><br><br><br>RedFlag Alert - Xero App Installation FAILED.<br><br>" + "For any support please contact us on<br><br>0330 460 9877<br><br>or<br><br>email: <a href='mailto:helpdesk@redflagalert.com'>helpdesk@redflagalert.com" + "<br><br><a href='https://www.xero.com/uk/'>Xero</a></p>";                        
        }
        email_send(subject, emailmessage);

        // 04/03/2025
        if (new_install == "yes") {
            email_send_rfa(subject, emailmessage);
        }
        // 04/03/2025

        console.log("📘: status", status);
        console.log("📗📗📗: FINISHED :📗📗📗");
        res.status(200).send(status);   
    }
});
/****************************************************************************************************************************************************************/

function firebase_get_xero_user(ip_user_uid) {

    console.log("📘: firebase_get_xero_user", ip_user_uid);
    return new Promise(resolve => {
        var ref = admin.database().ref(XERO_FB_USER + "/" + ip_user_uid);
		ref.once("value", function(snapshot) {
			if (snapshot.val() == null) resolve("NODATA"); 
            else resolve(snapshot.val());
        });
    });
}
/****************************************************************************************************************************************************************/

function firebase_update_xero_user(ip_user_uid, ip_tenantid, ip_rfa_user_created) {

    console.log("📘: firebase_update_xero_user", ip_user_uid, ip_tenantid, ip_rfa_user_created);
    if (ip_rfa_user_created == "yes") {
        admin.database().ref(XERO_FB_USER + "/" + ip_user_uid).update({
            tenantid         : ip_tenantid,
            rfa_user_created : "yes"
        }).then(async () => {
            console.log("📗: FIREBASE : SUCCESS - firebase_update_xero_user", XERO_FB_USER, ip_user_uid);
        }).catch((error) => {
            console.log("📕: FIREBASE : ERROR - firebase_update_xero_user", XERO_FB_USER, ip_user_uid);
        });
    }
    else {
        admin.database().ref(XERO_FB_USER + "/" + ip_user_uid).update({
            tenantid : ip_tenantid
        }).then(async () => {
            console.log("📗: FIREBASE : SUCCESS - firebase_update_xero_user", XERO_FB_USER, ip_user_uid);
        }).catch((error) => {
            console.log("📕: FIREBASE : ERROR - firebase_update_xero_user", XERO_FB_USER, ip_user_uid);
        });
    }
}
/****************************************************************************************************************************************************************/

exports.XERO_get_contacts = functions.runWith(runtimeOpts128).region('europe-west1').https.onRequest(async (req, res) => {

    const tenant_id    = req.query.tenant_id;
    const access_token = req.query.access_token;
    var search = null;
    if (req.query.search) search = req.query.search;
    var contact_id = null;
    if (req.query.contact_id) contact_id   = req.query.contact_id;
    console.log("📘: tenantid", tenant_id, "access_token", access_token, "search", search, "contact_id", contact_id);  

    setResponseHeaders(res); // Set CORS headers
    if (req.method === 'OPTIONS') res.status(204).send('');
    else {
        results = {};
        var contactresults = await xero_get_contacts(tenant_id, access_token, search, contact_id);
        results.status = "SUCCESS";
        results.data = contactresults;
        res.status(200).send(results);   
    }
});
/****************************************************************************************************************************************************************/

exports.XERO_get_account = functions.runWith(runtimeOpts128).region('europe-west1').https.onRequest(async (req, res) => {

    const tenantid = req.query.tenantid;
    console.log("📘: tenantid", tenantid);  
    
    setResponseHeaders(res); // Set CORS headers
    if (req.method === 'OPTIONS') res.status(204).send('');
    else {
        results = {};
        var xero_account = await xero_get_account(tenantid);   
        if (xero_account == "NODATA")	{
            console.error("📕: ERROR: xero_get_account", tenantid);
            results.status = "ERROR";
        }            
        else {
            results.status = "SUCCESS";
            results.data = xero_account;
        }
        res.status(200).send(results);   
    }
});
/****************************************************************************************************************************************************************/

function CRM_xero_auth(ip_xero) {

    console.log("📘: START: CRM_xero_auth");  

    return new Promise(resolve => {
        const tokenRequestData = {
            grant_type      : 'authorization_code',
            code            : ip_xero.code,
            redirect_uri    : ip_xero.XERO_REDIRECTURI,
            client_id       : ip_xero.XERO_CLIENT_ID,
            client_secret   : ip_xero.XERO_SECRET_ID
        };
        request.post({
            url: ip_xero.tokenEndpoint,
            form: tokenRequestData
        }, (error, response, body) => {

            var results = {};
            if (error) {
                console.error('📕: ERROR: Token Exchange Error:', error);
                results.status = "ERROR";
                resolve(results);
                return;
            }
            if (response.statusCode !== 200) {
                console.error('📕: ERROR: Token Exchange Failed. Status:', response.statusCode, 'Body:', body);
                results.status = "ERROR";
                resolve(results);
                return;
            }
            const tokenResponse = JSON.parse(body);
            console.log("📘: CRM_xero_auth - body", tokenResponse);
            results.status = "SUCCESS";
            results.id_token = tokenResponse.id_token;                      // 13/02/2025
            results.access_token = tokenResponse.access_token;
            results.refresh_token = tokenResponse.refresh_token;
            results.scope = tokenResponse.scope;
            //console.log('📗: SUCCESS : CRM_xero_auth');
            resolve(results);
            return;
        });
    });        
}
/*****************************************************************************************************************************************************************/

exports.XERO_get_accesstoken = functions.runWith(runtimeOpts128).region('europe-west1').https.onRequest(async (req, res) => {
    
    const raw_tenantid = req.query.tenantid;
    const api_key = req.query.api_key;

    setResponseHeaders(res); // Set CORS headers
    if (req.method === 'OPTIONS') res.status(204).send('');
    else {
        var results = {};
        if (!api_key) {
            results.status = "ERROR";
            results.error = "NO API Key";
            res.status(200).send(results);
            return;
        }
        if (api_key !== RFA_API_KEY) {
            results.status = "ERROR";
            results.error = "Invalid API Key";
            res.status(200).send(results);
            return;
        }
        if (!raw_tenantid) {
            results.status = "ERROR";
            results.error = "NO Tenant Id";
            res.status(200).send(results);
            return;
        }
        //const tenantid = decodeBase64(raw_tenantid);
        const tenantid = raw_tenantid;
        console.log("📘: tenantid", tenantid);   

        var xero_account = await xero_get_account(tenantid);    
        if (xero_account == "NODATA")	{
            console.error("📕: ERROR: xero_get_account", tenantid);
            results.status = "ERROR";
        }            
        else {
            var xero = {};
            xero.client_id     = XERO_CLIENT_ID;
            xero.client_secret = XERO_CLIENT_SECRET;
            xero.tenant_id     = tenantid;
            xero.refresh_token = xero_account.refresh_token;
            var xeroresults = await xero_getaccesstoken(xero);
            if (xeroresults.status == "ERROR") {
                console.error("📕: ERROR: xero_getaccesstoken", xero);
                results.status = "ERROR";
            }
            else {
                results.status        = "SUCCESS";
                results.access_token  = xeroresults.access_token,  
                results.refresh_token = xeroresults.refresh_token,
                results.expiresIn     = xeroresults.expiresIn           
                admin.database().ref(XERO_FB_TABLE + "/" + tenantid).update({
                    access_token  : xeroresults.access_token,  
                    refresh_token : xeroresults.refresh_token,
                    expiresIn     : xeroresults.expiresIn           
                }).then(() => {
                    console.log("📗: FIREBASE : SUCCESS : update");
                }).catch((error) => {
                    console.log("📕: FIREBASE : ERROR : update", XERO_FB_TABLE + "/" + tenantid, xeroresults);
                });
            }
        }            
        res.status(200).send(results);   
    }
});
/****************************************************************************************************************************************************************/

function xero_get_account(ip_tenantid) {

    console.log("📘: xero_get_account", ip_tenantid);
    return new Promise(resolve => {
        var ref = admin.database().ref(XERO_FB_TABLE + "/" + ip_tenantid);
		ref.once("value", function(snapshot) {
			if (snapshot.val() == null) resolve("NODATA"); 
            else resolve(snapshot.val());
        });
    });
}
/****************************************************************************************************************************************************************/

function decodeJWT(token) {
    try {
        // JWTs are usually in the format header.payload.signature
        const parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error('Invalid token');
        }
        // Decode the payload
        const payload = parts[1];
        const decodedPayload = atob(payload);
        // Parse the JSON payload
        return JSON.parse(decodedPayload);
    } catch (error) {
        console.error('Error decoding JWT:', error);
        return null;
    }
}
/****************************************************************************************************************************************************************/

function xero_get_user(ip_tenant_id, ip_access_token, ip_user_id) {

    return new Promise((resolve, reject) => {
        var url = XERO_API_URL + "/Users";
        const options = {
            method  : 'GET',
            url     : url,
            headers : { 'Content-Type' : 'application/json', 'Authorization' : `Bearer ${ip_access_token}`, 'xero-tenant-id' : ip_tenant_id }
        };
        request(options, (error, response, body) => {
            var results = {};
            if (response.statusCode == 200) {
                console.log('📗: SUCCESS : xero_get_contacts');
                const data = JSON.parse(body);
                results.status = "SUCCESS";
                results.data = data.Users;
                resolve(results);
                return;
            }
            console.error("📕: ERROR : xero_get_user", response.statusCode, body, ip_tenant_id, ip_access_token, ip_user_id);
            results.status = "ERROR";
            results.data = null;
            resolve(results);
            return;
        }).catch(function (error) {
            console.error("📕: ERROR : xero_get_user - catch", ip_tenant_id, ip_access_token, ip_user_id);
            var results = {};
            results.status = "ERROR";
            results.data = null;
            resolve(results);
            return;
        });
    });
}
/*****************************************************************************************************************************************************************/

function xero_get_organisation(ip_tenant_id, ip_access_token) {

    return new Promise((resolve, reject) => {
        const options = {
            method  : 'GET',
            url     : XERO_API_URL + "/Organisation",
            headers : { 'Content-Type' : 'application/json', 'Authorization' : `Bearer ${ip_access_token}`, 'xero-tenant-id' : ip_tenant_id }
        };
        request(options, (error, response, body) => {
            var results = {};
            if (response.statusCode == 200) {
                const data = JSON.parse(body);
                results.status = "SUCCESS";
                results.data = data;
                resolve(results);
                return;
            }
            console.error("📕: ERROR : xero_get_organisation", response.statusCode, body, ip_tenant_id, ip_access_token);
            results.status = "ERROR";
            results.data = null;
            resolve(results);
            return;
        }).catch(function (error) {
            console.error("📕: ERROR : xero_get_organisation - catch");
            var results = {};
            results.status = "ERROR";
            results.data = null;
            resolve(results);
            return;
        });
    });
}
/*****************************************************************************************************************************************************************/

exports.XERO_update_credits = functions.runWith(runtimeOpts128).region('europe-west1').https.onRequest(async (req, res) => {
    
    const tenantid      = req.query.tenantid;
    const api_key       = req.query.api_key;
    const creditcounter = req.query.creditcounter;
    const creditlimit   = req.query.creditlimit;
    const rfa_username   = req.query.rfa_username;
    const rfa_password   = req.query.rfa_password;

    console.log("📘: rfa_username", rfa_username, "rfa_password", rfa_password);

    res.set('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS')     {
        res.set('Access-Control-Allow-Methods', 'GET');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
    } 
    else {
        var results = {};
        if (!api_key) {
            results.status = "ERROR";
            results.error = "NO API Key";
            res.status(200).send(results);
            return;
        }
        if (api_key !== RFA_API_KEY) {
            results.status = "ERROR";
            results.error = "Invalid API Key";
            res.status(200).send(results);
            return;
        }
        if (!tenantid) {
            results.status = "ERROR";
            results.error = "NO Tenant Id";
            res.status(200).send(results);
            return;
        }
        if (rfa_username && rfa_password) {

            console.log("📘: Update username and password");
            admin.database().ref(XERO_FB_TABLE + "/" + tenantid).update({
                username : rfa_username,
                password : rfa_password
            }).then(() => {
                console.log("📗: FIREBASE : SUCCESS : update");
                results.status = "SUCCESS";
                res.status(200).send(results);
                return;
                
            }).catch((error) => {
                console.log("📕: FIREBASE : ERROR : update", XERO_FB_TABLE + "/" + tenantid);
                results.status = "ERROR";
                results.error = "FIREBASE : ERROR : update", XERO_FB_TABLE + "/" + tenantid;
                res.status(200).send(results);
                return;
            });
        }
        else {
            console.log("📘: Update creditcounter and creditlimit");

            admin.database().ref(XERO_FB_TABLE + "/" + tenantid).update({
                creditcounter : creditcounter,
                creditlimit : creditlimit
            }).then(() => {
                console.log("📗: FIREBASE : SUCCESS : update");
                results.status = "SUCCESS";
                res.status(200).send(results);
                return;
                
            }).catch((error) => {
                console.log("📕: FIREBASE : ERROR : update", XERO_FB_TABLE + "/" + tenantid);
                results.status = "ERROR";
                results.error = "FIREBASE : ERROR : update", XERO_FB_TABLE + "/" + tenantid;
                res.status(200).send(results);
                return;
            });
        }
    }
});
/****************************************************************************************************************************************************************/

function email_send(ip_subject, ip_message) {

    var mailOptions = { from : SEND_EMAIL, to : RECEIVE_EMAIL, subject : ip_subject, html : ip_message };
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) console.log(error);
        else console.log("📗: Email sent:", info.response);
    });
}
/*****************************************************************************************************************************************************************/

function email_send_rfa(ip_subject, ip_message) {

    var mailOptions = { from : SEND_EMAIL, to : RECEIVE_EMAIL_RFA, subject : ip_subject, html : ip_message };
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) console.log(error);
        else console.log("📗: Email sent:", info.response);
    });
}
/*****************************************************************************************************************************************************************/

/*
exports.XERO_oauth_openid = functions.runWith(runtimeOpts128).region('europe-west1').https.onRequest(async (req, res) => {
    const auth_code = req.query.code;
    const user_uid = req.query.state; // State contains the user uid.
    var xero_type = "PRACTICEMANAGER";
    if (user_uid == "123") xero_type = "STANDARD";
    console.log("📘: Version 1.0 : auth_code", auth_code, "state (user uid)", user_uid, "xero_type", xero_type);   
    setResponseHeaders(res); // Set CORS headers
    if (req.method === 'OPTIONS') res.status(204).send('');
    else {
        if (!auth_code) {
            var status = "STOP: Unauthorized Access : STOP";
            res.status(200).send(status);   
            return;
        }
        var xero = {};
        xero.code             = auth_code;
        xero.tokenEndpoint    = XERO_TOKEN_URL;
        xero.XERO_CLIENT_ID   = XERO_CLIENT_ID;
        xero.XERO_SECRET_ID   = XERO_CLIENT_SECRET;
        xero.XERO_REDIRECTURI = XERO_CLIENT_REDIRECT;
        var results = await CRM_xero_auth(xero);
        console.log("📘: CRM_xero_auth - results", results);   
        if (results.status == "SUCCESS") {
            console.log('📗: STEP 1 : SUCCESS : Access token:', results);
        }
        console.log("📗📗📗: FINISHED :📗📗📗");
        res.status(200).send(results);   
    }
});
*/
/****************************************************************************************************************************************************************/    