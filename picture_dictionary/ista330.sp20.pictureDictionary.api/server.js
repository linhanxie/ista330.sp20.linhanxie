const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');
app.use(cors());


const j = [
    {
        id: 0,
        imageId: 1,
        name: "The Supermarket",
        url: "https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=4223197863,1458558074&fm=179&app=42&f=JPEG?w=121&h=140&s=5BA63562175673C85EEA527F0200C06F",
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
            id: j[i]['id'],
            name: j[i]['name'],
            imageId: j[i]['imageId']
        });
    }
    console.log(arr)
    response.send(JSON.stringify(arr));
});

app.get('/pages/:contentId', (request, response) => {
    let t = "";
    console.log(request.params)

    for (let i = 0; i < j.length; i++) {
        if (request.params['contentId'] == j[i]['id']) {
            t = {
                id: j[i]['imageId'],
                name: j[i]['url'],
            }
        }
    }
    //console.log(t);
    response.send(t === "" ? "find error" : JSON.stringify(t));
});

app.get('/pages/:contentId/image/:imageId', (request, response) => {
    let { contentId, imageId } = request.params

    console.log(request.params);

    for (let i = 0; i < j.length; i++) {

        if (contentId == j[i]['id'] && imageId == j[i]['imageId']) {
            let stream = fs.createReadStream(j[i]['imageId'] + '.jpg');
            let responseData = [];
            if (stream) {
                stream.on('data', function (chunk) {
                    responseData.push(chunk);
                });
                stream.on('end', function () {
                    let finalData = Buffer.concat(responseData);
                    response.write(finalData);
                    response.end();
                });
            }
            return;
        }
    }
    response.send("404");
});

app.get('/pages/:contentId/:imageId/:objectX/:objectY', (request, response) => {
    let { contentId, imageId, objectX, objectY } = request.params
    let points
    try {
        points = JSON.parse(fs.readFileSync(imageId + '.json', 'utf-8'))
    } catch (error) {
        response.send("404");
        return;
    }
    for (let i = 0; i < points.length; i++) {
        let pointX = points[i].objectX
        let pointY = points[i].objectY
        if (objectX < pointX + 5 && objectX > pointX - 5 && objectY < pointY + 5 && objectY > pointY - 5) {
            response.send("ID 是" + points[i].id);
            return;
        }
    }


    response.send("404");


});

app.listen(822, () => {
    console.log("run success");
});