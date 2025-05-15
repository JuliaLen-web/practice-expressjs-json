const express = require('express');
const path = require('path');
const handlerTesting = require('./routes.js');

const app = express();


const port = 5000;

app.listen(port, () => {
    console.log('we are listen')
})

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(express.static(
    path.join(__dirname, 'public')
))

handlerTesting(app);
