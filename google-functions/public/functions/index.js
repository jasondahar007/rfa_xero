const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


// exports.helloWorld = functions.https.onRequest((request, response) => {
 //response.send("Hello from Firebase!");

exports.randomNumber = functions.https.onRequest((request, response) => 
{
    response.send("Hello from Firebase!");
});

exports.SearchAPIrandomNumber = functions.https.onRequest((request, response) => 
{
    response.send("SearchAPI");
});
 
// http callable function
exports.sayHello = functions.https.onCall((data, context) => 
{
    return `hello,, ninjas`;
});

//window.location.href="index.html";
