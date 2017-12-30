'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.urlencoded({ extended: true }));
let orm = require("orm");

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: './public'});
});

app.listen(3000, () => {
    console.log('running on port 3000...');
});

