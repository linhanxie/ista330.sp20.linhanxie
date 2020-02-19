const express = require('express');
const fs = require('fs');
const app = express();

const j = [
    {
        id: 0,
        imageId: 1,
        name: "The Supermarket",
        url: "http://img0.imgtn.bdimg.com/it/u=3386247472,87720242&fm=26&gp=0.jpg",
    },
    {
        id: 1,
        imageId: 2,
        name: "Outdoor Clothes",
        url: "http://img0.imgtn.bdimg.com/it/u=3386247472,87720242&fm=26&gp=0.jpg"
    },
    {
        id: 2,
        name: "Seasonal Verbs",
        imageId: 3,
        url: "http://img0.imgtn.bdimg.com/it/u=3386247472,87720242&fm=26&gp=0.jpg"
    },
    {
        id: 3,
        imageId: 4,
        name: "Houses",
        url: "http://img0.imgtn.bdimg.com/it/u=3386247472,87720242&fm=26&gp=0.jpg"
    },
];

app.get('/contents', (request, response) => {
    let arr = [];
    for (let i = 0; i < j.length; i++) {
        arr.push({
            id: j['id'],
            name: j['name']
        });
    }
    response.send(JSON.stringify(arr));
});

app.get('/pages/:contentId', (request, response) => {
    let t = "";
    for (let i = 0; i < j.length; i++) {
        if (request.params['contentId'] === j[i]['id']) {
            t = {
                id: j[i]['imageId'],
                name: j[i]['url'],
            }
        }
    }
    console.log(t);
    response.send(t === "" ? "find error" : JSON.stringify(t));
});

app.get('/pages/:contentId/image/:imageId', (request, response) => {
    let contentId = request.params['contentId']
    let imageId = request.params['imageId']
    for (let i = 0; i < j.length; i++) {
        console.log( j[i]['id'],  j[i]['imageId']);

        if(contentId === j[i]['id'] && imageId === j[i]['imageId']) {
            let stream = fs.createReadStream( j[i]['urllet'] );
            let responseData = [];
            if (stream) {
                stream.on( 'data', function( chunk ) {
                    responseData.push( chunk );
                });
                stream.on( 'end', function() {
                    let finalData = Buffer.concat( responseData );
                    response.write( finalData );
                    response.end();
                });
            }
            return;
        }
    }
    response.send("404");
});

app.get('/pages/:contentId/:imageId/:objectX/:objectY', () => {
    let contentId = request.params['contentId']
    let imageId = request.params['imageId']
    let objectX = request.params['objectX']
    let objectY = request.params['objectY']

});

app.listen(822, () => {
    console.log("run success");
});