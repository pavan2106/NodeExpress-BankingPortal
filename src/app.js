const fs = require('fs');
const path = require('path');
const express = require('express');
//const { response } = require('express');
//const request = require('request');
const app = express();
const port = process.env.PORT || 3000;

// app.get('/', funtion(request, response){

//     response.render('index.ejs', {
//         name: req.params.name,
//         quote: quote
//       });
// });
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/public')));
app.get('/index', function (req, res) {
    res.render('index.ejs', {
        title: "Index"
    });
});
app.get('/', function (req, res) {
    res.render('index', {
        title: "Index"
    });
});

app.listen(port, function() {
    console.log(`Server is up and running on port :${port}`);
});