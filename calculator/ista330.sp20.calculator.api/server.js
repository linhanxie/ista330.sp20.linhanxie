
// dependencies
const express = require(’express ’); const url = require(’url ’);
//create the server
const app = express(); const port = 3001;
// the methods
app.get(’/’, (request , response) => {
var urlParts = url.parse(request.url , true); var parameters = urlParts . query ;
var expression = parameters . expression ; response.send(expression + " = ?");
});
// start the server
app.listen(port, ()
=> console . log ( ’ Listening on port ’ + port ));
