// dependencies
const express = require('express');
const url = require('url');
const calculator = require('./calculator.js');
// create the server
const app = express();
const port = 3001;
// the methods
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

app.get('/', (request, response) => {
    var urlParts = url.parse(request.url, true);
    var parameters = urlParts.path;
    console.log(calculator.calculate);
    // console.log(getQueryVariable(parameters, "value"), urlParts, JSON.stringify({url: request.path}));
    let v = getQueryVariable(parameters, "value");
    let s = v + "=" + calculator.calculate(getQueryVariable(parameters, "value"));

    response.json({txt: s});
});
// start the server
app.listen(port, () => console.log('Listening on port' + port));


function getQueryVariable(url, variable) {
    var query = url.replace("/?", "");
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}
