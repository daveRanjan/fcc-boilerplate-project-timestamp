// index.js
// where your node app starts
var {DateTime, Settings} = require('luxon');
Settings.throwOnInvalid=true;

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", function (req, res) {
    let date = DateTime.now().setZone('GMT');
    res.json({
        unix: date.toUnixInteger(),
        utc: date.toFormat("ccc, dd MMM yyyy 00:00:00 ZZZZ")
    });  
});

app.get("/api/:date", function (req, res) {
    const param = req.params.date;
    let isUnix = /^\d+$/.test(param);
     try {
        if(!isUnix){
            date = DateTime.fromISO(param, {zone: 'GMT'});
        }else {
            date = DateTime.fromMillis(Number.parseInt(param), {zone: 'GMT'});
        }
    }catch (ex){
        res.json({
            error: "Invalid Date"
        })
    }

    res.json({
        unix: date.toUnixInteger(),
        utc: date.toFormat("ccc, dd MMM yyyy 00:00:00 ZZZZ")
    });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
