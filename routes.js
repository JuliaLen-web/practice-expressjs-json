const fs = require('fs');

function handlerTesting(app) {
    app.get('/test', (req, res) => {
        return res.sendFile(__dirname + '/public/test.html');
    })

    app.post('/test', (req, res) => {
        return res.redirect('/test');
    })




    app.get('/json/data', (req, res) => {
        return res.send(__dirname + '/public/json/data.json');
    })

    app.post('/json/data', (req, res) => {
        req.setEncoding('utf8');

        var data = fs.readFileSync(__dirname + '/public/json/data.json');
        var myObject = JSON.parse(data);

        myObject.push(req.body);

        fs.writeFile(__dirname + '/public/json/data.json', JSON.stringify(myObject, null, 4), (err) => {
            if (err) throw err;
        });
        res.writeHead(200, { "Content-Type": "application/json" });

        res.end();
    })






    app.get('/updateResult', (req, res) => {
        return res.json();
    })

    app.post('/updateResult', (req, res) => {
        req.setEncoding('utf8');

        var data = fs.readFileSync(__dirname + '/public/json/data.json');
        var myObject = JSON.parse(data);

        var newData = myObject.map(el => {
            if (el.id === req.body.id) {
                el.result = req.body.result
            }
            return el
        })

        fs.writeFile(__dirname + '/public/json/data.json', JSON.stringify(newData, null, 4), (err) => {
            if (err) throw err;
        });
        res.writeHead(200, { "Content-Type": "application/json" });

        res.end();
    }) 
}

module.exports = handlerTesting;