const functions = require('firebase-functions');
const rp = require('request-promise');
const cors = require('cors')({ origin: true });
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.do = functions.https.onRequest((req,res) => {
  //UrlFetchApp.fetch(e.parameter.get, {'method':'get'});
  cors(req, res, () => {
    if( req.method !== "GET" ) {
      return res.status(401).json({
        message: "Not allowed"
      });
    }
    rp({
      uri: req.query["get"],
      qs: {
        format: 'json'
      },
      headers: {
        'User-Agent': 'Request-Promise',
        'Connection': 'keep-alive'
      },
      json: true // Automatically parses the JSON string in the response
    })
      .then(data => {
        console.log(`GET OK:${req.query["get"]}`);
        console.log(`REDIRECT TO:${req.query["redirect"]}`);
        return res.send("<script>window.top.location.href='"+req.query["redirect"]+"';</script>");
      })
      .catch(err => {
        console.log(err);
        console.log(`GET NG:${req.query["get"]}`);
        console.log(`REDIRECT TO:${req.query["redirect"]}`);
        return res.send("<script>window.top.location.href='"+req.query["redirect"]+"';</script>");
      })
  })
});
