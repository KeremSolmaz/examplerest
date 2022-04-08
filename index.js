const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const apicache = require("apicache");
const fetch = require('node-fetch');
const https = require('https');

const app = express();
let cache = apicache.middleware
const port = 3000;

app.use(cors());

app.use(cache('5 minutes'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/api/ping', (req, res) => {
    res.statusCode = 200;
    res.json({ "success": true });
});
app.get('/api/posts', (req, res) => {
    var tags = req.query.tags;
    var sortBy = req.query.sortBy;
    var direction = req.query.direction;
    if (!tags) {
        res.statusCode = 400;
        res.json({ "error": "Tags parameter is required" });
        return;
    }
    if (sortBy) {
        if (sortBy == "id" || sortBy == "reads" || sortBy == "likes" || sortBy == "popularity") {
        } else {
            res.statusCode = 400;
            res.json({ "error": "sortBy parameter is invalid" });
            return;
        }
    } else {
        sortBy = "id"
    }
    if (direction) {
        if (direction == "desc" || direction == "asc") {
        } else {
            res.statusCode = 400;
            res.json({ "error": "Direction Type is invalid" });
            return;
        }
    } else {
        direction = "asc"
    }



    const headers2 = {
        "Content-Type": "application/json",
    }



    res.statusCode = 200;
    var request = require('request-promise');
    var tagsArr = tags.split(',');
    var calls = [
    ];
    for (i = 0; i <= tagsArr.length - 1; i++) {
        calls.push(request({ url: 'https://api.hatchways.io/assessment/solution/posts?tags=' + tagsArr[i] + '&sortBy=' + sortBy + '&direction=' + direction, headers: headers2 }))

    }
    Promise.all(calls).then(function (results) {
        const jsonArr = [];
        for (i = 0; i <= tagsArr.length - 1; i++) {
            var kerem = JSON.parse(results[i])
            jsonArr.push(kerem.posts);

        }
        var arr = JSON.stringify(jsonArr);
        arr = arr.replace('[[', '[');
        arr = arr.replace('],[', ',');
        arr = arr.replace(']]', ']');

        const arif = JSON.parse(arr);
        const clean = arif.filter((arif, index, self) =>
            index === self.findIndex((t) => (t.id === arif.id)))
        if (direction == "asc") {
            clean.sort((a, b) => Number(a.sortBy) - Number(b.sortBy));
        }
        if (direction == "desc") {
            clean.sort((a, b) => Number(b.sortBy) - Number(a.sortBy));
        }
        res.json(clean)
    });
})
app.listen(port, () => console.log(`Example Rest Api ${port}!`))



function getdata(tags, sortBy, direction) {

}

