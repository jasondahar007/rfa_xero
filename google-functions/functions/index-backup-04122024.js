//
// This comment will fix problem of no wait in loop DO NOT REMOVE
/* eslint-disable */
//
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const runtimeOpts128 = { timeoutSeconds: 540, memory: '128MB' }

var moment = require('moment');                                 
const request = require('request-promise');

const nodemailer          = require('nodemailer');  
const SEND_EMAIL          = "toradigital007@gmail.com";
const SEND_EMAIL_PASSWORD = "ijyygabusrdgzebr";
let transporter = nodemailer.createTransport({ service : 'gmail', auth : { user: SEND_EMAIL, pass: SEND_EMAIL_PASSWORD } });

// RFA Codes
//const RFA_SECRET      = 'wR47Q~RKVNDxJJnDWMN5Nyk5QJ.xnspB0ihRX';        
//const RFA_CLIENTID    = '7b57110e-3dc8-4c4b-b09d-32cbc695c543';
//const RFA_SCOPE       = 'd76c73c9-ff6e-4214-b894-1ba94eaa5110/.default';
//const RFA_URL         = 'https://login.microsoftonline.com/fbfaf324-3a1f-4584-a1e0-665383636ab2/oauth2/v2.0/token';
const RFA_GRAPHQL_URL = 'https://azp-primary-api.azurewebsites.net/graphql';    

const XERO_FB_TABLE      = "XERO_account";
const XERO_FB_USER       = "XERO_user";
const XERO_CREDITCOUNTER = 0;
const XERO_CREDITLIMIT   = 0;
const XERO_PLAN_BRONZE   = 10;
const XERO_PLAN_SILVER   = 25;
const XERO_PLAN_GOLD     = 50;
const XERO_PLAN_TEST     = 100;
const XERO_PLAN_NAME_BRONZE = "Bronze";
const XERO_PLAN_NAME_SILVER = "Silver";
const XERO_PLAN_NAME_GOLD   = "Gold";
const XERO_PLAN_NAME_TEST   = "Test"; // TBC
const XERO_PLAN_STATUS_ACTIVE = "ACTIVE";

const fs = require('fs');
const axios = require("axios");
const crypto = require('crypto');

// 01/12/2024
const path = require("path");
const os = require("os");
// 01/12/2024

// Xero API constants
//const XERO_TOKEN_URL     = 'https://identity.xero.com/connect/token';
const XERO_API_URL       = 'https://api.xero.com/api.xro/2.0';
const XERO_PM_API_URL    = "https://api.xero.com/practicemanager/3.1/";
const XERO_CLIENT_ID     = "94D1CFBA89EB40328EE3DA3FBC1B0B01";
const XERO_CLIENT_SECRET = "rn_UoLmiedMMwX53nA1OLkw1g5qrxANStZQ-a2JQMzbyDjdr";
const RFA_API_KEY        = "Ju41sjvJbSFVb9c7tFqbRoCczA6WgrSyhuJfaCQ7TOUKXY04IGHcyCHKVnHyaT7o";

"use strict";

const { rfa_get_access_token, setResponseHeaders } = require('./rfa-common-files/rfa-common');
const { DOMParser } = require('xmldom');
const decodeBase64 = (encodedStr) => { return atob(encodedStr); };
const encodeBase64 = (str) => { return btoa(str); };

// XERO_pm_get_contacts - Practice Manager

// XERO_billing_subscriptions_webhook
// XERO_aml_create_history
// XERO_aml_getdocument
// XERO_oauth
// XERO_get_contacts
// XERO_get_account
// XERO_get_accesstoken
// XERO_update_credits

// Xero Install Link
// https://login.xero.com/identity/connect/authorize?response_type=code&client_id=94D1CFBA89EB40328EE3DA3FBC1B0B01&redirect_uri=https://europe-west1-redflag-live.cloudfunctions.net/XERO_oauth&scope=openid profile email accounting.transactions accounting.contacts accounting.settings accounting.attachments offline_access&state=123

// Xero Practice Manager
// https://login.xero.com/identity/connect/authorize?response_type=code&client_id=94D1CFBA89EB40328EE3DA3FBC1B0B01&redirect_uri=https://europe-west1-redflag-live.cloudfunctions.net/XERO_oauth&scope=openid profile email offline_access practicemanager practicemanager.client&state=123

/*****************************************************************************************************************************************************************/

test();
async function test() {
    console.log("📘📘📘: test :📘📘📘");

    /*
    var tenantid = "a221dd5e-2bdf-4fd3-b56a-6beae564150e";
    var creditlimit = "100";
    var creditcounter = "100";
    firebase_update_credits(tenantid, creditlimit, creditcounter);
    return;
    */
          
    var xero = {};
    xero.client_id     = XERO_CLIENT_ID;
    xero.client_secret = XERO_CLIENT_SECRET;

    //xero.tenant_id = "034e1fc1-9a44-43ef-b0ee-7b4213f138bc"; // RFA Practice (Test) !Y1-64
    //xero.tenant_id = "954d8ae0-9f3d-4bd4-b6d8-ca5dc8d05ad3"; // "Demo Company (UK) !!N6yQ  - practicemanager.client
    xero.tenant_id = "a221dd5e-2bdf-4fd3-b56a-6beae564150e"; // RFA PM
         
    var results = await xero_get_accesstoken(xero.tenant_id);
    if (results.status == "SUCCESS") {
        console.log("📗: SUCCESS : xero_get_accesstoken");
        xero.access_token = results.access_token;
    }
    else {
        console.log("📕: ERROR xero_getaccesstoken", xero.tenant_id);
        return;
    }
    var customer = {};
    customer.access_token = xero.access_token;

    var data = {};
    data.uuid = "55ee5017-2864-4a32-ad54-92e5b7587a10";
    var results = await xero_pm_get_contact(customer.access_token, xero.tenant_id, data); // PRACTICE MANAGER : Update contact
    console.log("📘: results", results);

    //<Response api-method="Contact"><Status>OK</Status><Contact><UUID>55ee5017-2864-4a32-ad54-92e5b7587a10</UUID><Name>Jason Dahar</Name><Mobile>447956118041</Mobile><Email>jasondahar@hotmail.com</Email><Phone></Phone><Salutation>Mr</Salutation><Addressee></Addressee><Position>MD</Position><IsPrimary>Yes</IsPrimary><IsDeleted>No</IsDeleted></Contact></Response>

    /*
    // Create custom fields    
    var results = await xero_create_custom_fields(customer.access_token, xero.tenant_id);
    if (results == "SUCCESS") {
        console.log("📗: SUCCESS : xero_create_custom_fields");
    }
    else {
        console.log("📕: ERROR xero_create_custom_fields");
        return;
    }
    // Create custom fields    
    return;    
    */

    var request = {};
    //request.requestid    = "78605"; // Works
    //request.requestid    = "83690";
    //request.requestid    = "87618";
    request.requestid    = "87148";
    request.username     = "jason@torasoftware.co.uk";
    request.password     = "pigface007";
    request.tenant_id = "a221dd5e-2bdf-4fd3-b56a-6beae564150e"; // RFA PM
    //request.tenant_id    = "4039bc61-aecf-44b7-a7f3-d91cfaa9ab24"; // Demo company
    request.contact_id = "d6eb2e24-6525-4ace-937c-76219b419292";
    //request.contact_id   = "f80504a7-c0ed-4b02-978f-c12db883039f";
    request.filename     = "jason-dahar-request-83690.pdf";
    request.notemessage = "Jason Dahar check completed, see attachment.";
    request.access_token = xero.access_token;

    var url = "https://europe-west1-redflag-live.cloudfunctions.net/XERO_pm_aml_getdocument?requestid=" + request.requestid 
    + "&username=" + request.username
    + "&password=" + request.password
    + "&tenant_id=" + request.tenant_id
    + "&contact_id=" + request.contact_id
    + "&access_token=" + xero.access_token
    + "&filename=" + request.filename
    + "&notemessage=" + request.notemessage;

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
            console.error("📕: ERROR: XERO_aml_getdocument - this.status", this.status, xero.tenant_id);
            var xeroresults = {};
            xeroresults.status = "ERROR";
            return;
        }
    }
    xhr.send();
    return;
   
      
    var data = {}
    data.uuid = "d6eb2e24-6525-4ace-937c-76219b419292";
    //data.filePath = "zoho-rfa-userguide.pdf";
    data.filePath = "psam-jason@torasoftware.co.uk-01-12-2024.pdf";

    data.filePath = "xero-test-doc.pdf";

    data.title = "Test Title PSAM xxxxx";
    data.text = "The note relating to the document";
    data.folder = "Images";
    data.fileName = "test2.pdf";

    var results = await xero_pm_create_client_document1(customer.access_token, xero.tenant_id, data);
    console.log("📘: results", results);
    return;
 

    var data = {};
    data.uuid = "55ee5017-2864-4a32-ad54-92e5b7587a10";
    data.name = "Jason Dahar"; // Mandatory
    data.email = "jasondahar@hotmail.com";
    data.mobile = "07956118041";
    data.rfa_status = "COMPLETED";

    var url = "https://europe-west1-redflag-live.cloudfunctions.net/XERO_pm_update_contact?tenant_id=" + xero.tenant_id + "&access_token=" + customer.access_token + 
        "&uuid=" + data.uuid +
        "&name=" + data.name +
        "&email=" + data.email +
        "&mobile=" + data.mobile +
        "&rfa_status=" + data.rfa_status;

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

    //var results = await xero_create_custom_fields(customer.access_token, xero.tenant_id);
    //return;

    /*
    var id = "d6eb2e24-6525-4ace-937c-76219b419292";
    var results = await xero_pm_get_client(customer.access_token, xero.tenant_id, id);
    console.log("📘: results", results);
    return;

    var contactresults = await xero_pm_get_contacts(customer.access_token, xero.tenant_id);
    console.log("📘: contactresults", contactresults);
    return;

    // PRACTICE MANAGER : Contact - GET - Custom Fields
    var uuid = "55ee5017-2864-4a32-ad54-92e5b7587a10";
    var results = await xero_pm_get_contact_custom_fields(customer.access_token, xero.tenant_id, uuid);
    console.log("📘: results", results);
    return;
    // PRACTICE MANAGER : Contact - GET - Custom Fields
    */
  

    // PRACTICE MANAGER : Update contact and custom fields

    // PRACTICE MANAGER : Get and store custom fields - Need uuid's for updating
    var results = await xero_pm_get_custom_fields(customer.access_token, xero.tenant_id);
    if (results.status !== "SUCCESS") {
        console.log("📕: ERROR : xero_pm_get_custom_fields", customer.access_token, xero.tenant_id);
        return;
    }
    var custom_fields_arr = results.data;
    console.log("📗: custom_fields_arr", custom_fields_arr.length);

    var data = {};
    data.uuid = "55ee5017-2864-4a32-ad54-92e5b7587a10";
    data.name = "Jason Dahar"; // Mandatory
    data.email = "jasondahar@hotmail.com";
    data.mobile = "07956118041";
   
    // Custom fields
    data.rfa_status = "Completed";
    data.rfa_result = "Passed";
    //data.rfa_url = "url";
    data.rfa_type = "KNOW_YOUR_CLIENT_ENHANCED_AML";
    data.rfa_dob = "19700403";
    data.rfa_title = "MR";
    data.rfa_gender = "MALE";
    data.rfa_middle_name = "Sudesh1";
    data.rfa_date_of_first_residence = "19700403";
    data.rfa_requestid = "123";
    data.rfa_update_date = "19700403";
    data.rfa_housenumber = "21";
    data.rfa_street = "Fred Street";
    data.rfa_city = "Fred City";
    data.rfa_county = "Fred County";
    data.rfa_postcode = "BB6 8HH";
    data.rfa_country = "US";

    var updateresults = await xero_pm_update_contact(customer.access_token, xero.tenant_id, data); // PRACTICE MANAGER : Update contact
    console.log("📘: updateresults", updateresults);

    var updateresults = await xero_pm_update_contact_custom_fields(customer.access_token, xero.tenant_id, data, custom_fields_arr); // PRACTICE MANAGER : Update contact custom fields        
    console.log("📘: updateresults", updateresults);
    return;
    // PRACTICE MANAGER : Update contact and custom fields

    /*
    var tenantid = "a221dd5e-2bdf-4fd3-b56a-6beae564150e";
    var refresh_token = "7LYUdnzZapudbAImf5eVCimQLeRYYhva_7SsC75hYXE";
    var xero = {};
    xero.client_id     = XERO_CLIENT_ID;
    xero.client_secret = XERO_CLIENT_SECRET;
    xero.tenant_id     = tenantid;
    xero.refresh_token = refresh_token;
    var xeroresults = await xero_getaccesstoken(xero);
    console.log("📘: xeroresults", xeroresults);
    var customer = {};
    customer.access_token = xeroresults.access_token;
    */

    //var results = await xero_get_organisation(tenantid, customer.access_token);
    //console.log("📘: results", results);
    //return;

    var data = await xero_pm_get_clients(customer.access_token, xero.tenant_id);
    console.log("📘: data", data);
    return;

    // XERO Practice Manager - CLIENT - Update
    var data = {};
    data.uuid = "d6eb2e24-6525-4ace-937c-76219b419292"; // Client id
    data.name = "RFA IDV AML Client updated"; // Mandatory
    data.address = "25 Highwoods Park";
    data.email = "jasondahar@hotmail.com";
    data.city = "Blackburn";
    data.region = "Lancashire";
    data.postcode = "BB6 8HN";
    data.country = "UK";
    data.phone = "07956118041";
    data.firstname = "Jason";
    data.lastname = "Dahar";
    data.dob = null;

    var updateresults = await xero_pm_update_client(customer.access_token, xero.tenant_id, data);
    console.log("📘: updateresults", updateresults);

    if (updateresults.status == "SUCCESS") {
        console.log("📗: SUCCESS : xero_pm_update_client");
        if (updateresults.data == "SUCCESS") {
            console.log("📗: SUCCESS : UPDATE - XERO Practice Manager - CLIENT");
        }
        else {
            console.log("📕: ERROR : UPDATE - XERO Practice Manager - CLIENT", customer.access_token, xero.tenant_id, data);
        }
    }
    else {
        console.log("📕: ERROR : xero_pm_update_client", customer.access_token, xero.tenant_id, data);
    }
    // XERO Practice Manager - CLIENT - Update

    var id = "d6eb2e24-6525-4ace-937c-76219b419292";
    var results = await xero_pm_get_client(customer.access_token, xero.tenant_id, id);
    console.log("📘: results", results);
    return;
   
    
    //var data = await xero_pm_get_custom_fields(xeroresults.access_token, xero.tenant_id);
    //console.log("📘: data", data);
        
    return;

    const decoded = decodeJWT(customer.access_token);
    const xero_user_id = decoded.xero_userid;
    console.log("📘: GLOBAL xero_user_id", xero_user_id);

    var results = await xero_get_user(tenantid, customer.access_token);
    console.log("📘: results", results);
    return;

    var xero = {};
    xero.client_id     = XERO_CLIENT_ID;
    xero.client_secret = XERO_CLIENT_SECRET;

    //xero.tenant_id = "034e1fc1-9a44-43ef-b0ee-7b4213f138bc"; // RFA Practice (Test) !Y1-64
    xero.tenant_id = "954d8ae0-9f3d-4bd4-b6d8-ca5dc8d05ad3"; // "Demo Company (UK) !!N6yQ  - practicemanager.client
      
    var results = await xero_get_accesstoken(xero.tenant_id);
    if (results.status == "SUCCESS") {
        console.log("📗: SUCCESS : xero_get_accesstoken");
        xero.access_token = results.access_token;
    }
    else {
        console.log("📕: ERROR xero_getaccesstoken", xero.tenant_id);
        return;
    }
  
    /*
    var results = await xero_get_access_token_non_tenant();
    if (results.status == "SUCCESS") {
        console.log("📗: SUCCESS : xero_get_access_token_non_tenant");
        xero.access_token_non_tenant = results.access_token;
    }
    else {
        console.log("📕: ERROR xero_get_access_token_non_tenant");
        return;
    }
    */
    console.log("📘 xero", xero);     
    
    var data = await xero_pm_get_clients(xero.access_token);
    //var data = await xero_pm_get_clients(xero.access_token_non_tenant);
    //console.log("📘 data", data); 
    return;
    var credits = 1000;
    //var tenantid = "034e1fc1-9a44-43ef-b0ee-7b4213f138bc";
    var tenantid = "1fe3fbbb-0657-46a5-b31b-2b4316d7df45"; // Scott
    xero_manually_update_credits(tenantid, credits);
    return;

    founding_date_arr = null;
    var gv_CompanyFields = {};
    gv_CompanyFields.dataholics__Year_Founded = "zzz";

    var company_data = {};
    company_data.name = "Jason";
    company_data.company_phone = "07956118041";
    let recordData = {
        Company: company_data.name ? company_data.name : "",
        Industry: company_data.industry && company_data.industry.length > 0 && company_data.industry[0].value ? company_data.industry[0].value : "",
        [gv_CompanyFields.dataholics__Year_Founded]: founding_date_arr && founding_date_arr.length > 0 ? founding_date_arr[0] : "",
        Phone: company_data.company_phone && company_data.company_phone.length > 0 ? company_data.company_phone[0] : "",
    };
    console.log(recordData);
    return;

    //tenantid = "2957b295-d39c-4188-8b0f-cc5f1a7e8ce2";
    //var results = await xero_get_account_google_function(tenantid);
    //console.log(results);
    //return;
    // https://go.xero.com/organisationlogin/default.aspx?shortcode=!y4qZC&redirecturl=/Contacts/View/362819c9-f285-4d09-ac95-26327863adac // Deep link - View a contact record: (new ui view) 
  
    var xero = {};
    xero.client_id     = XERO_CLIENT_ID;
    xero.client_secret = XERO_CLIENT_SECRET;
    xero.tenant_id     = '2957b295-d39c-4188-8b0f-cc5f1a7e8ce2'; // Demo company
    //xero.tenant_id     = 'f01cc07a-c533-465c-bef2-25490b1dd672'; // Red Flag Alert
    
    /*
    var results = await xero_get_accesstoken(xero.tenant_id);
    if (results.status == "SUCCESS") {
        console.log("📗: SUCCESS : xero_get_accesstoken");
        xero.access_token = results.access_token;
    }
    else {
        console.log("📕: ERROR xero_getaccesstoken", xero.tenant_id);
        return;
    }
    */

    var results = await xero_get_access_token_non_tenant();
    if (results.status == "SUCCESS") {
        console.log("📗: SUCCESS : xero_get_access_token_non_tenant");
        xero.access_token_non_tenant = results.access_token;
    }
    else {
        console.log("📕: ERROR xero_get_access_token_non_tenant");
        return;
    }
    //console.log("📘 xero", xero);      
    
    //ip_resourceUrl = "https://api.xero.com/appstore/1.0/subscriptions/365d4626-dee9-428f-82cb-fdae36b667fb";
    ip_resourceUrl = "https://api.xero.com/appstore/1.0/subscriptions/742290ae-b589-44c2-9c3a-6888bce388c7";
       
    var results = await xero_get_subcriptions(xero.access_token_non_tenant, ip_resourceUrl);
    console.log("📘 results", results);                    
    console.log("📘 results", results.data.subscriptionItems);       

    var sub_details = xero_get_current_sub_details(results.data);
    console.log("📘 sub_details", sub_details);                    
    return;

    //var results = await xero_get_user(xero.tenant_id, xero.access_token, null);

    var shortcode =  null;
    var results = await xero_get_organisation(xero.tenant_id, xero.access_token);
    if (results.status == "SUCCESS") {
        console.log("📗: SUCCESS : xero_get_organisation");
        if (results.data.Organisations) {
            shortcode =  results.data.Organisations[0].ShortCode;
        }
    }
    else {
        console.log("📕: ERROR xero_get_organisation", xero.tenant_id, xero.access_token);
        return;
    }
    console.log("📘 shortcode", shortcode);                
    return;

    var request = {};
    //request.requestid    = "78605"; // Works
    request.requestid    = "83690";
    request.username     = "jason@torasoftware.co.uk";
    request.password     = "pigface007";
    request.tenant_id    = "4039bc61-aecf-44b7-a7f3-d91cfaa9ab24"; // Demo company
    request.contact_id   = "f80504a7-c0ed-4b02-978f-c12db883039f";
    request.filename     = "jason-dahar-request-83690.pdf";
    request.notemessage = "Jason Dahar check completed, see attachment.";
    request.access_token = xero.access_token;

    var url = "https://europe-west1-redflag-live.cloudfunctions.net/XERO_aml_getdocument?requestid=" + request.requestid 
    + "&username=" + request.username
    + "&password=" + request.password
    + "&tenant_id=" + request.tenant_id
    + "&contact_id=" + request.contact_id
    + "&access_token=" + xero.access_token
    + "&filename=" + request.filename
    + "&notemessage=" + request.notemessage;

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
            console.error("📕: ERROR: XERO_aml_getdocument - this.status", this.status, xero.tenant_id);
            var xeroresults = {};
            xeroresults.status = "ERROR";
            return;
        }
    }
    xhr.send();
    return;

    var url = "https://europe-west1-redflag-live.cloudfunctions.net/XERO_get_contacts?tenant_id=" + xero.tenant_id + "&access_token=" + xero.access_token + "&contact_id=&search=" + search;
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = async function() {
        if (this.status == 200) {
            var xeroresults = JSON.parse(this.responseText);
            console.log("📘 xeroresults", xeroresults.data);
            return;
        }
        else {
            console.error("📕: ERROR: XERO_get_contacts - this.status", this.status, xero.tenant_id);
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

async function xero_pm_create_client_document1(ip_access_token, ip_tenant_id, ip_data) {

    console.log("📘 xero_pm_create_client_document1");

    try {
        // Prepare the XML body
        const fileContent = fs.readFileSync(ip_data.filePath); // Read file content
        const base64Content = fileContent.toString("base64"); // Encode to Base64

        await new Promise(resolve => setTimeout(resolve, 6000)); // Wait 6 seconds to write file!

         
        const body = `
            <Document>
                <ClientUUID>${ip_data.uuid}</ClientUUID>
                <Title>${ip_data.title || "Document Title"}</Title>
                <Text>${ip_data.text || "The note relating to the document"}</Text>
                <Folder>${ip_data.folder || "Images"}</Folder>
                <FileName>${ip_data.fileName || "test.txt"}</FileName>
                <Content>${base64Content}</Content>
            </Document>`;
    
        //console.log("📘 XML Body:", body);

        // Make the API request
        const response = await axios.post(
            `${XERO_PM_API_URL}client.api/document`,
            body,
            {
                headers: {
                    "Content-Type": "application/xml",
                    Authorization: `Bearer ${ip_access_token}`,
                    "Xero-tenant-id": ip_tenant_id,
                },
            }
        );
    

        if (response.status === 200) {
            console.log("📗: SUCCESS: xero_pm_create_client_document");
            return { status: "SUCCESS", data: response.data };
        } else {
            console.error("📕: ERROR: xero_pm_create_client_document", response.status, response.data);
            return { status: "ERROR", data: null };
        }
    } catch (error) {
    
        //console.log("📘 error", error);

        console.error("📕: ERROR: xero_pm_create_client_document - catch", error.message);
        return { status: "ERROR", data: null };
    }
}

/*
function xero_pm_create_client_document(ip_access_token, ip_tenant_id, ip_data) {
   
    return new Promise((resolve, reject) => {

        var body = "<Document>";
        body += "<ClientUUID>" + ip_data.uuid + "</ClientUUID>";
        body += "<Title>Document Title</Title>";
        body += "<Text>The note relating to the document</Text>";
        body += "<Folder>Images</Folder>";
        body += "<FileName>test.txt</FileName>";
        body += "<Content>File content base 64 encoded</Content>";
        body += "</Document>";
        console.log("📘 body", body);

        const options = {
            method  : 'POST', 
            url     : XERO_PM_API_URL + "client.api/document",
            headers : { 'Content-Type' : 'application/json', 'Authorization' : `Bearer ${ip_access_token}`, 'Xero-tenant-id' : ip_tenant_id },
            body : body
        };
        var results = {};        
        request(options, (error, response, body) => {

            if (response.statusCode == 200) {
                console.log('📗: SUCCESS : xero_pm_create_client_document');
                results.status = "SUCCESS";
                var xmlresults = parseAddCustomFieldResponse(body);
                results.data = xmlresults;
                resolve(results);    
                return;
            }
            console.error("📕: ERROR : xero_pm_create_client_document", response.statusCode, body);
            results.status = "ERROR";
            results.data = null;
            resolve(results);
            return;
            
        }).catch(function (error) {
            console.error("📕: ERROR : xero_pm_create_client_document - catch");
            results.status = "ERROR";
            results.data = null;
            resolve(results);
            return;
        });
    });    
}
*/
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
                //console.log('📗: SUCCESS : xero_pm_get_custom_fields');
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
            var fieldresult = ip_custom_fields_arr.find(item => item.Name === 'RFA AML Status');
            if (fieldresult.UUID) body += "<CustomField><UUID>" + fieldresult.UUID + "</UUID><Text>" + ip_data.rfa_status + "</Text></CustomField>";
        }
        if (ip_data.rfa_result) {
            var fieldresult = ip_custom_fields_arr.find(item => item.Name === 'RFA AML Result');
            if (fieldresult.UUID) body += "<CustomField><UUID>" + fieldresult.UUID + "</UUID><Text>" + ip_data.rfa_result + "</Text></CustomField>";
        }
        if (ip_data.rfa_url) {
            var fieldresult = ip_custom_fields_arr.find(item => item.Name === 'RFA AML URL');
            if (fieldresult.UUID) body += "<CustomField><UUID>" + fieldresult.UUID + "</UUID><Text>" + ip_data.rfa_url + "</Text></CustomField>";
        }
        if (ip_data.rfa_type) {
            var fieldresult = ip_custom_fields_arr.find(item => item.Name === 'RFA AML Type');
            if (fieldresult.UUID) body += "<CustomField><UUID>" + fieldresult.UUID + "</UUID><Text>" + ip_data.rfa_type + "</Text></CustomField>";
        }
        if (ip_data.rfa_dob) {
            var fieldresult = ip_custom_fields_arr.find(item => item.Name === 'RFA AML Date of Birth');
            if (fieldresult.UUID) body += "<CustomField><UUID>" + fieldresult.UUID + "</UUID><Date>" + ip_data.rfa_dob + "</Date></CustomField>";
        }
        if (ip_data.rfa_title) {
            var fieldresult = ip_custom_fields_arr.find(item => item.Name === 'RFA AML Title');
            if (fieldresult.UUID) body += "<CustomField><UUID>" + fieldresult.UUID + "</UUID><Text>" + ip_data.rfa_title + "</Text></CustomField>";
        }
        if (ip_data.rfa_gender) {
            var fieldresult = ip_custom_fields_arr.find(item => item.Name === 'RFA AML Gender');
            if (fieldresult.UUID) body += "<CustomField><UUID>" + fieldresult.UUID + "</UUID><Text>" + ip_data.rfa_gender + "</Text></CustomField>";
        }
        if (ip_data.rfa_middle_name) {
            var fieldresult = ip_custom_fields_arr.find(item => item.Name === 'RFA AML Middle Name');
            if (fieldresult.UUID) body += "<CustomField><UUID>" + fieldresult.UUID + "</UUID><Text>" + ip_data.rfa_middle_name + "</Text></CustomField>";
        }
        if (ip_data.rfa_date_of_first_residence) {
            var fieldresult = ip_custom_fields_arr.find(item => item.Name === 'RFA AML Date of First Residence');
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
        //console.log("📘 body", body);
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

function xero_pm_get_contact(ip_access_token, ip_tenant_id, ip_data) {
   
    return new Promise((resolve, reject) => {

        //https://api.xero.com/practicemanager/3.1/client.api/contact/f8235e1a-d383-48b7-9139-ba97ab8ca889?clientUuid=50539fbc-d8e2-4943-bece-313a22489bb8

        var url = XERO_PM_API_URL + "client.api/contact/" + ip_data.uuid;

        const options = {
            method  : 'GET', 
            url     : url,
            headers : { 'Content-Type' : 'application/json', 'Authorization' : `Bearer ${ip_access_token}`, 'Xero-tenant-id' : ip_tenant_id },
         
        };
        var results = {};        
        request(options, (error, response, body) => {

            console.log("📘 body", body);

            if (response.statusCode == 200) {
                console.log('📗: SUCCESS : xero_pm_get_contact');
                results.status = "SUCCESS";
                var xmlresults = parseAddCustomFieldResponse(body);
                results.data = xmlresults;
                resolve(results);    
                return;
            }
            console.error("📕: ERROR : xero_pm_get_contact", response.statusCode, body);
            results.status = "ERROR";
            results.data = null;
            resolve(results);
            return;
            
        }).catch(function (error) {
            console.error("📕: ERROR : xero_pm_get_contact - catch");
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

        var url = XERO_PM_API_URL + "client.api/contact/" + ip_data.uuid;

        var body = "<Contact>";
        body += "<Name>" + ip_data.name + "</Name>";
        if (ip_data.email)       body += "<Email>"      + ip_data.email + "</Email>";
        if (ip_data.mobile)      body += "<Mobile>"     + ip_data.mobile + "</Mobile>";
        body += "</Contact>";
        console.log("📘 body", body);

        const options = {
            method  : 'PUT', 
            url     : url,
            headers : { 'Content-Type' : 'application/json', 'Authorization' : `Bearer ${ip_access_token}`, 'Xero-tenant-id' : ip_tenant_id },
            body : body
        };
        var results = {};        
        request(options, (error, response, body) => {

            if (response.statusCode == 200) {
                console.log('📗: SUCCESS : xero_pm_update_client');
                results.status = "SUCCESS";
                var xmlresults = parseAddCustomFieldResponse(body);
                results.data = xmlresults;
                resolve(results);    
                return;
            }
            console.error("📕: ERROR : xero_pm_update_client", response.statusCode, body);
            results.status = "ERROR";
            results.data = null;
            resolve(results);
            return;
            
        }).catch(function (error) {
            console.error("📕: ERROR : xero_pm_update_client - catch");
            results.status = "ERROR";
            results.data = null;
            resolve(results);
            return;
        });
    });    
}
/*****************************************************************************************************************************************************************/

function xero_pm_update_client(ip_access_token, ip_tenant_id, ip_data) {

    // Build XML Body
    var body = "<Client>";
    body += "<UUID>" + ip_data.uuid + "</UUID>";
    body += "<Name>" + ip_data.name + "</Name>";
    if (ip_data.address)    body += "<Address>"   + ip_data.address + "</Address>";
    if (ip_data.email)      body += "<Email>"     + ip_data.email + "</Email>";
    if (ip_data.city)       body += "<City>"      + ip_data.city + "</City>";
    if (ip_data.region)     body += "<Region>"    + ip_data.region + "</Region>";
    if (ip_data.postcode)   body += "<PostCode>"  + ip_data.postcode + "</PostCode>";
    if (ip_data.country)    body += "<Country>"   + ip_data.country + "</Country>";
    if (ip_data.phone)      body += "<Phone>"     + ip_data.phone + "</Phone>";
    if (ip_data.firstname)  body += "<FirstName>" + ip_data.firstname + "</FirstName>";
    if (ip_data.lastname)   body += "<LastName>"  + ip_data.lasttname + "</LastName>";
    if (ip_data.dob)   body += "<DateOfBirth>"  + ip_data.lasttname + "</DateOfBirth>";
    body += "</Client>";
    console.log("📘 body", body);

    return new Promise((resolve, reject) => {

        const options = {
            method  : 'PUT', 
            url     : XERO_PM_API_URL + "client.api/update",
            headers : { 'Content-Type' : 'application/json', 'Authorization' : `Bearer ${ip_access_token}`, 'Xero-tenant-id' : ip_tenant_id },
            body : body
        };

        var results = {};        
        request(options, (error, response, body) => {

            if (response.statusCode == 200) {
                console.log('📗: SUCCESS : xero_pm_update_client');
                results.status = "SUCCESS";
                var xmlresults = parseAddCustomFieldResponse(body);
                results.data = xmlresults;
                resolve(results);    
                return;
            }
            console.error("📕: ERROR : xero_pm_update_client", response.statusCode, body);
            results.status = "ERROR";
            results.data = null;
            resolve(results);
            return;
            
        }).catch(function (error) {
            console.error("📕: ERROR : xero_pm_update_client - catch");
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
        /*
        var aml_field = { fieldname : "RFA AML Status", type : "Text" };
        aml_fields.push(aml_field);
        var aml_field = { fieldname : "RFA AML Result", type : "Text" };
        aml_fields.push(aml_field);
        var aml_field = { fieldname : "RFA AML URL", type : "Text" };
        aml_fields.push(aml_field);
        var aml_field = { fieldname : "RFA AML Type", type : "Text" };
        aml_fields.push(aml_field);
        var aml_field = { fieldname : "RFA AML Date of Birth", type : "Date" };
        aml_fields.push(aml_field);
        var aml_field = { fieldname : "RFA AML Title", type : "Text" };
        aml_fields.push(aml_field);
        var aml_field = { fieldname : "RFA AML Gender", type : "Text" };
        aml_fields.push(aml_field);
        var aml_field = { fieldname : "RFA AML Middle Name", type : "Text" };
        aml_fields.push(aml_field);
        var aml_field = { fieldname : "RFA AML Date of First Residence", type : "Date" };
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
        */
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
    console.log("📘: tenantid", tenant_id, "access_token", access_token, "search", search, "contact_id", contact_id);   

    setResponseHeaders(res); // Set CORS headers
    if (req.method === 'OPTIONS') res.status(204).send('');
    else {    
        results = {};

        // Get all contacts
        var data = await xero_pm_get_contacts(access_token, tenant_id);
    
        // For each contact get custom fields
        var contact_arr = [];
        for (var i = 0; i < data.data.length ; i++) { 
         
            var contact = {};
            contact = data.data[i];
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
    
            var customresults = await xero_pm_get_contact_custom_fields(access_token, tenant_id, data.data[i].UUID);
            if (customresults.status !== "SUCCESS") {
                console.log("📕: ERROR xero_pm_get_contact_custom_fields", access_token, tenant_id, data.data[i].UUID);
            }
            else {
                custom_fields_arr = customresults.data;
                for (var x = 0; x < custom_fields_arr.length ; x++) { 
                    if (custom_fields_arr[x].Name == "RFA AML Status") contact.rfa_aml_status = custom_fields_arr[x].Value;
                    if (custom_fields_arr[x].Name == "RFA AML Result") contact.rfa_aml_result = custom_fields_arr[x].Value;
                    if (custom_fields_arr[x].Name == "RFA AML URL") contact.rfa_aml_url = custom_fields_arr[x].Value;
                    if (custom_fields_arr[x].Name == "RFA AML Type") contact.rfa_aml_type = custom_fields_arr[x].Value;
                    if (custom_fields_arr[x].Name == "RFA AML Date of Birth") contact.rfa_aml_dob = custom_fields_arr[x].Value;
                    if (custom_fields_arr[x].Name == "RFA AML Title") contact.rfa_aml_title = custom_fields_arr[x].Value;
                    if (custom_fields_arr[x].Name == "RFA AML Gender") contact.rfa_aml_gender = custom_fields_arr[x].Value;
                    if (custom_fields_arr[x].Name == "RFA AML Middle Name") contact.rfa_aml_middle_name = custom_fields_arr[x].Value;
                    if (custom_fields_arr[x].Name == "RFA AML Date of First Residence") contact.rfa_aml_date_of_first_residence = custom_fields_arr[x].Value;
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
        results.status = "SUCCESS";
        results.data = contact_arr;
        res.status(200).send(results);   
    }
});
/****************************************************************************************************************************************************************/

function xero_pm_get_contacts(ip_access_token, ip_tenant_id) {

    return new Promise((resolve, reject) => {
        const options = {
            method  : 'GET', 
            url     : XERO_PM_API_URL + "client.api/contacts?pageSize=10",
            headers : { 'Content-Type' : 'application/json', 'Authorization' : `Bearer ${ip_access_token}`, 'Xero-tenant-id' : ip_tenant_id }
        };
        request(options, (error, response, body) => {
            var results = {};
            if (response.statusCode == 200) {
                console.log('📗: SUCCESS : xero_pm_get_contacts');
                results.status = "SUCCESS";

                console.log("📘 body", body); // TBC

                const contactlist = xero_pm_parse_contacts(body);
                results.data = contactlist;
                resolve(results);
                return;
            }
            console.error("📕: ERROR : xero_pm_get_contacts", response.statusCode, body);
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

function xero_pm_parse_contacts(xml) {

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, "text/xml");
    const contactsNodes = xmlDoc.getElementsByTagName("Contact");
    const contacts = [];
    for (let i = 0; i < contactsNodes.length; i++) {
        const contactNode = contactsNodes[i];
        const contact = {};
        contact.UUID = contactNode.getElementsByTagName("UUID")[0].textContent || '';
        contact.Name = contactNode.getElementsByTagName("Name")[0].textContent || '';
        contact.Mobile = contactNode.getElementsByTagName("Mobile")[0].textContent || '';
        contact.Email = contactNode.getElementsByTagName("Email")[0].textContent || '';
        contact.Phone = contactNode.getElementsByTagName("Phone")[0].textContent || '';
        contact.Salutation = contactNode.getElementsByTagName("Salutation")[0].textContent || '';
        contact.Addressee = contactNode.getElementsByTagName("Addressee")[0].textContent || '';
        contact.IsDeleted = contactNode.getElementsByTagName("IsDeleted")[0].textContent || '';
        contacts.push(contact);
    }
    return contacts;
}
/*****************************************************************************************************************************************************************/

function xero_pm_get_clients(ip_access_token, ip_tenant_id) {

    return new Promise((resolve, reject) => {

        const options = {
            method  : 'GET', 
            url     : XERO_PM_API_URL + "client.api/list",
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

function xero_pm_get_client(ip_access_token, ip_tenant_id, ip_id) {

    return new Promise((resolve, reject) => {

        const options = {
            method  : 'GET', 
            url     : XERO_PM_API_URL + "client.api/get/" + ip_id,
            headers : { 'Content-Type' : 'application/json', 'Authorization' : `Bearer ${ip_access_token}`, 'Xero-tenant-id' : ip_tenant_id }
        };
        request(options, (error, response, body) => {

            var results = {};
            if (response.statusCode == 200) {
                console.log('📗: SUCCESS : xero_pm_get_client');
                results.status = "SUCCESS";

                console.log("📘: body", body);

                const client = parseXeroClient(body);
                results.data = client;
                resolve(results);
                return;
            }
            console.error("📕: ERROR : xero_pm_get_client", response.statusCode, body, url);
            results.status = "ERROR";
            results.data = null;
            resolve(results);
            return;
            
        }).catch(function (error) {
            console.error("📕: ERROR : xero_pm_get_client - catch", url);
            var results = {};
            results.status = "ERROR";
            results.data = null;
            resolve(results);
            return;
        });
    });    
}
/*****************************************************************************************************************************************************************/

function parseXeroClient(xmlString) {

    // Parse the XML string into a DOM
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");

    // Check for errors in the XML
    const statusNode = xmlDoc.getElementsByTagName("Status")[0];
    if (!statusNode || statusNode.textContent !== "OK") {
        throw new Error("Invalid response status: " + (statusNode.textContent || "Unknown"));
    }
    const customFieldNodes = xmlDoc.getElementsByTagName("Client");
    const customFields = [];

    for (let i = 0; i < customFieldNodes.length; i++) {
        const node = customFieldNodes[i];
        const customField = {
            uuid: node.getElementsByTagName("UUID")[0].textContent || null,
            name: node.getElementsByTagName("Name")[0].textContent || null,
            address: node.getElementsByTagName("Address")[0].textContent || null,
            city: node.getElementsByTagName("City")[0].textContent || null,
            region: node.getElementsByTagName("Region")[0].textContent || null,
            postcode: node.getElementsByTagName("PostCode")[0].textContent || null,
            country: node.getElementsByTagName("Country")[0].textContent || null,
            phone: node.getElementsByTagName("Phone")[0].textContent || null,
          
        };
        customFields.push(customField);
    }
    return customFields;
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
        const webUrl = clientNode.getElementsByTagName("WebUrl")[0].textContent || "";
        clients.push({
            UUID: uuid,
            Name: name,
            WebUrl: webUrl,
        });
    }
    return clients;
}
/*****************************************************************************************************************************************************************/

function xero_manually_update_credits(ip_tenantid, ip_credits) {

    var url = "https://europe-west1-redflag-live.cloudfunctions.net/XERO_update_credits?tenantid=" + ip_tenantid + "&api_key=" + RFA_API_KEY + "&creditlimit=" + ip_credits + "&creditcounter=" + ip_credits;
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
            'headers' : {
              'Content-Type'  : 'application/x-www-form-urlencoded',
              'authorization' : 'Basic ' + encodeToBase64(XERO_CLIENT_ID + ':' + XERO_CLIENT_SECRET),
            },
            formData: {
              'grant_type'    : 'client_credentials',
              'scope'         : 'marketplace.billing'
            }
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

exports.XERO_pm_aml_getdocument = functions.runWith(runtimeOpts128).region('europe-west1').https.onRequest(async (req, res) => {

    var request = {};
    request.requestid    = Number(req.query.requestid);
    request.username     = req.query.username;
    request.password     = req.query.password;
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
                //var history = { Details: request.notemessage };
                //var historyresults = await xero_create_history(request.tenant_id, request.access_token, request.contact_id, history);

                // Create Xero Contact Attachment
                var xeroresults = await xero_pm_create_attachment(request.tenant_id, request.access_token, request.contact_id, fileresults.filelocation, request.filename);
                console.log("📘: xeroresults", xeroresults);   
            }                              
        }
        results.status = "SUCCESS";
        res.status(200).send(results);
    }
});
/****************************************************************************************************************************************************************/

async function xero_pm_create_attachment(ip_tenant_id, ip_access_token, ip_contact_id, ip_filelocation, ip_filename) {
    try {
        console.log("📘: zzz Input Parameters:", { ip_tenant_id, ip_access_token, ip_contact_id, ip_filelocation, ip_filename });

        // Determine if ip_filelocation is a URL or local file path
        let filePath = ip_filelocation;

        if (ip_filelocation.startsWith("http://") || ip_filelocation.startsWith("https://")) {
            console.log("📘: File location is a URL. Downloading...");

            // Step 1: Download the file to a temporary location
            const tempFilePath = path.join(os.tmpdir(), ip_filename);
            const response = await axios({
                method: "GET",
                url: ip_filelocation,
                responseType: "stream",
            });

            const writer = fs.createWriteStream(tempFilePath);
            response.data.pipe(writer);

            await new Promise((resolve, reject) => {
                writer.on("finish", resolve);
                writer.on("error", reject);
            });

            console.log("📘: File downloaded successfully:", tempFilePath);
            filePath = tempFilePath; // Update filePath to downloaded location
        }

        // Step 2: Read and encode the file content to Base64
        const fileContent = fs.readFileSync(filePath);
        const base64Content = fileContent.toString("base64");

        // Step 3: Prepare XML body
        const body = `
            <Document>
                <ClientUUID>${ip_contact_id}</ClientUUID>
                <Title>${path.basename(ip_filename, path.extname(ip_filename))}</Title>
                <Text>Attached document</Text>
                <Folder>AML Documents</Folder>
                <FileName>${ip_filename}</FileName>
                <Content>${base64Content}</Content>
            </Document>
        `;
        console.log("📘 XML Body:", body);

        // Step 4: Send the API request
        const apiResponse = await axios.post(
            `${XERO_PM_API_URL}client.api/document`,
            body,
            {
                headers: {
                    "Content-Type": "application/xml",
                    Authorization: `Bearer ${ip_access_token}`,
                    "Xero-tenant-id": ip_tenant_id,
                },
            }
        );

        if (apiResponse.status === 200) {
            console.log("📗: SUCCESS: xero_pm_create_attachment");
            return { status: "SUCCESS", data: apiResponse.data };
        } else {
            console.error("📕: ERROR: xero_pm_create_attachment", apiResponse.status, apiResponse.data);
            return { status: "ERROR", data: apiResponse.data };
        }
    } catch (error) {
        console.error("📕: ERROR: xero_pm_create_attachment - catch", error.message);
        return { status: "ERROR", data: error.message };
    }
}



/*
function xero_pm_create_attachment(ip_tenant_id, ip_access_token, ip_contact_id, ip_filelocation, ip_filename) {

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

        try {

            //const fileContent = fs.readFileSync(ip_data.filePath); // Read file content
            //const base64Content = fileContent.toString("base64"); // Encode to Base64


            
            // Prepare the XML body
            //const fileContent = fs.readFileSync(ip_data.filePath); // Read file content
            //const fileContent = fs.readFileSync(ip_filelocation); // catch ENOENT: no such file or directory, open 'https://azpexportstore.blob.core.windows.net/rfstaff1/-jason%40torasoftware.co.uk-01-12-2024.pdf?sv=2023-08-03&se=2024-12-01T12%3A59%3A31Z&sr=b&sp=r&sig=PGholGWjKF9IfbjFbeNGSB5jdepmoQCForcab2evcrI%3D'
            //const fileContent = fs.readFileSync(fileStream); // catch The "path" argument must be of type string or an instance of Buffer or URL. Received an instance of ReadStream
          
            //const base64Content = fileStream.toString("base64"); // Content>[object Object]</Content> Error 500

            const fileContent = fs.readFileSync(ip_filelocation);
            await new Promise(resolve => setTimeout(resolve, 6000)); // Wait 6 seconds to write file!

            const base64Content = fileContent.toString("base64");
    

            var data = {};
            data.title = "Jason Title";
            data.text = "Jason text";
            data.folder = "AML Documents";
            data.filename = "jason.pdf";
            
            const body = `
                <Document>
                    <ClientUUID>${ip_contact_id}</ClientUUID>
                    <Title>${data.title}</Title>
                    <Text>${data.text}</Text>
                    <Folder>${data.folder}</Folder>
                    <FileName>${data.filename}</FileName>
                    <Content>${base64Content}</Content>
                </Document>
            `;
            console.log("📘 XML Body:", body);
    
            // Make the API request
            const response = await axios.post(
                `${XERO_PM_API_URL}client.api/document`,
                body,
                {
                    headers: { "Content-Type": "application/xml", Authorization: `Bearer ${ip_access_token}`, "Xero-tenant-id": ip_tenant_id, },
                }
            );
    
            if (response.status === 200) {
                console.log("📗: SUCCESS: xero_pm_create_client_document");

                resolve("SUCCESS");
                return { status: "SUCCESS", data: response.data };
            } else {
                console.error("📕: ERROR: xero_pm_create_client_document", response.status, response.data);

                resolve("ERROR");
                return { status: "ERROR", data: null };
            }
        } catch (error) {
            console.error("📕: ERROR: xero_pm_create_client_document - catch", error.message);
            resolve("ERROR");
            return { status: "ERROR", data: null };
        }

    });
}
*/
/*****************************************************************************************************************************************************************/








exports.XERO_aml_getdocument = functions.runWith(runtimeOpts128).region('europe-west1').https.onRequest(async (req, res) => {

    var request = {};
    request.requestid    = Number(req.query.requestid);
    request.username     = req.query.username;
    request.password     = req.query.password;
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

function aml_get_accesstoken(ip_username, ip_password) {

    return new Promise(resolve => {
        var amlquery = 'mutation signIn { signIn(credentials: { userName: "' + ip_username + '", password: "'+ ip_password + '" }) { accessToken refreshToken expiresInSeconds } }';
        var options = {
            'method'  : 'POST', 
            'url'     : RFA_GRAPHQL_URL,
            'headers' : { 'Content-Type' : 'application/json' },  
            body      : JSON.stringify({ query : amlquery, variables : {} })
        };
        var results = {};
        request(options, function (error, response) {
            if (error) throw new Error(error);
            var body = JSON.parse(response.body);
            if (body.data) {
                results.status = "SUCCESS";
                results.accesstoken = body.data.signIn.accessToken;
            }
            else {
                console.log("📕: ERROR : aml_get_accesstoken", ip_username, ip_password);
                results.status = "ERROR";
            }
            resolve(results);    
            return;
        }).catch((error) => {
            console.log("📕: ERROR : aml_get_accesstoken : CATCH", ip_username, ip_password);
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

function xero_get_mobile(ip_phones) {

    if (ip_phones) {
        for (x = 0; x < ip_phones.length; x++) {
            if (ip_phones[x].PhoneType == "MOBILE" && ip_phones[x].PhoneNumber) return ip_phones[x].PhoneNumber;
        }
    }
    return null;
}
/*****************************************************************************************************************************************************************/

function xero_get_accesstoken(ip_tenant_id) {

    return new Promise((resolve, reject) => {
        var url = "https://europe-west1-redflag-live.cloudfunctions.net/XERO_get_accesstoken?tenantid=" + ip_tenant_id + "&api_key=" + RFA_API_KEY;
        var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onload = async function() {
            if (this.status == 200) {
                var xeroresults = JSON.parse(this.responseText);
                resolve(xeroresults);
                return;
            }
            else {
                console.error("📕: ERROR: xero_get_accesstoken - this.status", this.status, ip_tenant_id);
                var xeroresults = {};
                xeroresults.status = "ERROR";
                resolve(xeroresults);
                return;
            }
        }
        xhr.send();
    });
}
/*****************************************************************************************************************************************************************/

function xero_get_account_google_function(ip_tenantid) {

    return new Promise((resolve, reject) => {
        var url = "https://europe-west1-redflag-live.cloudfunctions.net/XERO_get_account?tenantid=" + ip_tenantid;
        var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onload = async function() {
            if (this.status == 200) {

                if (this.responseText == "NODATA") {
                    resolve("NODATA");
                    return;
                }
                else {
                    const data = JSON.parse(this.responseText);    
                    resolve(data);
                    return;
                }
            }
            else {
                console.log("Function excuted failed (" + this.status + ")");
                resolve("ERROR");
                return;                
            }
        }
        xhr.send();
    });
}
/*****************************************************************************************************************************************************************/

function xero_get_history(ip_tenant_id, ip_access_token, ip_contact_id) {

    return new Promise((resolve, reject) => {
        const options = {
            method  : 'GET',
            url     : XERO_API_URL + "/Contacts/" + ip_contact_id + "/history",
            headers : { 'Content-Type' : 'application/json', 'Authorization' : `Bearer ${ip_access_token}`, 'xero-tenant-id' : ip_tenant_id }
        };
        request(options, (error, response, body) => {
            var results = {};
            if (response.statusCode == 200) {
                console.log('📗: SUCCESS : xero_get_history');
                const data = JSON.parse(body);
                results.status = "SUCCESS";
                results.data = data.HistoryRecords;
                resolve(results);
                return;
            }
            console.error("📕: ERROR : xero_get_history", response.statusCode, body, ip_tenant_id, ip_access_token, ip_contact_id, url);
            results.status = "ERROR";
            results.data = null;
            resolve(results);
            return;
        }).catch(function (error) {
            console.error("📕: ERROR : xero_get_history - catch", response.statusCode, body, ip_tenant_id, ip_access_token, ip_contact_id, url);
            results.status = "ERROR";
            results.data = null;
            resolve(results);
            return;
        });
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

    const auth_code = req.query.code;
    console.log("📘: auth_code", auth_code);   

    // State contains the user uid.
    const user_uid = req.query.state;
    console.log("📘: state (user uid)", user_uid);   

    const xero_type = "PRACTICEMANAGER";
    if (user_uid == "123") xero_type = "STANDARD";
    console.log("📘: xero_type", xero_type);   

    setResponseHeaders(res); // Set CORS headers
    if (req.method === 'OPTIONS') res.status(204).send('');
    else {
        if (!auth_code) {
            var status = "STOP: Unauthorized Access : STOP";
            res.status(200).send(status);   
            return;
        }
        var xero = {};
        xero.code = auth_code;
        xero.tokenEndpoint = 'https://identity.xero.com/connect/token';
        xero.XERO_CLIENT_ID = "94D1CFBA89EB40328EE3DA3FBC1B0B01";
        xero.XERO_SECRET_ID = "rn_UoLmiedMMwX53nA1OLkw1g5qrxANStZQ-a2JQMzbyDjdr";
        xero.XERO_REDIRECTURI = "https://europe-west1-redflag-live.cloudfunctions.net/XERO_oauth";

        var installdate = moment().format('DD/MM/YYYY');
        var emailmessage = '<p style="font-size: 16px;">NEW Installation Date: <strong>' + installdate + '</strong></p>';

        var results = await CRM_xero_auth(xero);
        if (results.status == "SUCCESS") {
            console.log('📗: SUCCESS : Access token:', results);


            if (xero_type == "PRACTICEMANAGER") {
                var status = "<p style='font-size:26px;text-align:center;'><br><br><br>Red Flag Alert - Xero App has been connected successfully to your Xero Practice Manager.<br><br>" +
                             "<p style='font-size:26px;text-align:center;'><br><br><br>Please close this window, and refresh.<br><br>";
            }
            else {
                var status = "<p style='font-size:26px;text-align:center;'><br><br><br>RedFlag Alert - Xero App has been Installed Successfully.<br><br>" +
                            "For any support please contact us on<br><br>0330 460 9877<br><br>or<br><br>email: <a href='mailto:helpdesk@redflagalert.com'>helpdesk@redflagalert.com" +
                            "<br><br><a href='https://www.xero.com/uk/'>Xero</a></p>";                   
            }
                      
            var customer = {};
            customer.access_token   = results.access_token;
            customer.refresh_token  = results.refresh_token;
            customer.scope          = results.scope;
            customer.tenanttype     = "";

            var xeroresults = await xero_get_connections(customer.access_token);
            console.log("📘: results", xeroresults);

            // 20/11/2024
            var practicemanager = "NO";
            for (i = 0; i < xeroresults.length; i++) 
            {
                if (xeroresults[i].tenantType == 'PRACTICEMANAGER') {

                    console.log("📘: FOUND PRACTICEMANAGER");
                    practicemanager     = "YES";
                    customer.tenantid   = xeroresults[i].tenantId;
                    customer.tenantname = xeroresults[i].tenantName;
                    customer.tenanttype = xeroresults[i].tenantType;
                    customer.firstname  = "";
                    customer.lastname   = "";
                    customer.email      = "";
                    customer.shortcode = "";
                    customer.organisationrole = "";
                    break;
                }
            }
            // 20/11/2024

            // TBC - Issue with multiple results
            if (practicemanager == "NO") {

                customer.tenantid   = xeroresults[0].tenantId;
                customer.tenantname = xeroresults[0].tenantName;
                customer.tenanttype = xeroresults[0].tenantType;
                //customer.tenantid = xeroresults[1].tenantId;
                //customer.tenantname = xeroresults[1].tenantName;

                // Get Xero user email
                customer.firstname = "";
                customer.lastname = "";
                customer.email = "";
                customer.organisationrole = "";
                
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
                else {
                    console.log("📕: ERROR xero_get_user", customer.tenant_id);
                }
                customer.shortcode = "";
                var results = await xero_get_organisation(customer.tenantid, customer.access_token);
                if (results.status == "SUCCESS") {
                    console.log("📗: SUCCESS : xero_get_organisation");
                    if (results.data.Organisations) customer.shortcode =  results.data.Organisations[0].ShortCode;
                }
                else {
                    console.log("📕: ERROR xero_get_organisation", customer.tenantid, customer.access_token);
                }
            }
            
            // Create RFA User - TBC
            // username is email
            customer.username = "jason@torasoftware.co.uk";
            customer.password = "pigface007";
            // Create RFA User - TBC

            customer.installdate = installdate;
            customer.aml_message = "Hello <firstname>, " + customer.tenantname + " need to identify you, please click the link to continue.";
            console.log("📘: customer", customer);
         
            var xero_account = await xero_get_account(customer.tenantid);    
            if (xero_account == "NODATA")	{

                // New Firebase Database for User
                console.log("📘: XERO Account: Does not exist, create NEW one");

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
                    user_uid         : user_uid
                });
                if (xero_type == "PRACTICEMANAGER") gf_update_xero_user(user_uid, customer.tenantid); // 28/11/2024

                var subject = "Xero App NEW Installation COMPLETED - " + customer.tenantname;
                var emailmessage = '<p style="font-size: 16px;">NEW Installation Date: <strong>' + installdate + '</strong></p>' +
                    '<p style="font-size: 16px;">Credit Counter: <strong>' + XERO_CREDITCOUNTER + '</strong></p>' +
                    '<p style="font-size: 16px;">Credit Limit: <strong>' + XERO_CREDITLIMIT + '</strong></p>' +
                    '<p style="font-size: 16px;">First name: <strong>' + customer.firstname + '</strong></p>' +
                    '<p style="font-size: 16px;">Last name: <strong>' + customer.lastname + '</strong></p>' +
                    '<p style="font-size: 16px;">Email: <strong>' + customer.email + '</strong></p>' +
                    '<p style="font-size: 16px;">organisationrole: <strong>' + customer.organisationrole + '</strong></p>' +
                    '<p style="font-size: 16px;">AML Message: <strong>' + customer.aml_message + '</strong></p>' +
                    '<p style="font-size: 16px;">Xero Type: <strong>' + customer.xero_type + '</strong></p>';
            }
            else {
                admin.database().ref(XERO_FB_TABLE + "/" + customer.tenantid).update({
                    accesstoken   : customer.access_token,  
                    refresh_token : customer.refresh_token,
                    company_name  : customer.tenantname,
                    scope         : customer.scope,
                    installdate   : installdate,
                    user_uid      : user_uid
                });
                if (xero_type == "PRACTICEMANAGER") gf_update_xero_user(user_uid, customer.tenantid); // 28/11/2024

                var subject = "Xero App UPDATE Installation COMPLETED - " + customer.tenantname;
                var emailmessage = '<p style="font-size: 16px;">UPDATE Installation Date: <strong>' + installdate + '</strong></p>';
                emailmessage += '<p style="font-size: 16px;">Xero Type: <strong>' + xero_type + '</strong></p>';
            }
        }
        else {
            var subject = "Xero App NEW Installation FAILED ";
            var status =  "<p style='font-size:26px;text-align:center;'><br><br><br>RedFlag Alert - Xero App Installation FAILED.<br><br>" +
            "For any support please contact us on<br><br>0330 460 9877<br><br>or<br><br>email: <a href='mailto:helpdesk@redflagalert.com'>helpdesk@redflagalert.com" +
            "<br><br><a href='https://www.xero.com/uk/'>Xero</a></p>";                        
        }
        var mailOptions = { from : SEND_EMAIL, to : 'jason.dahar@redflagalert.com', subject : subject, html : emailmessage };
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) console.log(error);
            else console.log("📗: Email sent:", info.response);
        });
        res.status(200).send(status);   
    }
});
/****************************************************************************************************************************************************************/

function gf_update_xero_user(ip_user_uid, ip_tenantid) {

    admin.database().ref(XERO_FB_USER + "/" + ip_user_uid).update({
        tenantid : ip_tenantid
    }).then(async () => {
        console.log("📗: FIREBASE : SUCCESS", XERO_FB_USER, ip_user_uid);
    }).catch((error) => {
        console.log("📕: FIREBASE : ERROR", XERO_FB_USER, ip_user_uid);
    });
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
            console.log("📘: body", tokenResponse);
            results.status = "SUCCESS";
            results.access_token = tokenResponse.access_token;
            results.refresh_token = tokenResponse.refresh_token;
            results.scope = tokenResponse.scope;
            console.log('📗: SUCCESS : CRM_xero_auth');
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
    
    const tenantid  = req.query.tenantid;
    const api_key       = req.query.api_key;
    const creditcounter = req.query.creditcounter;
    const creditlimit   = req.query.creditlimit;

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
});
/****************************************************************************************************************************************************************/
