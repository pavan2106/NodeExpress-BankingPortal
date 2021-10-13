const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const port =  3000;
const accountRoutes= require('./routes/accounts');
const servicesRoutes= require('./routes/services');
app.set('views', path.join(__dirname, '/views'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));
const { accounts, writeJSON, users } = require('./data.js');

app.get('/', function (req, res) {
    res.render('index', {
        title: "Account Summary",
        accounts: accounts 
    });
});
app.get('/profile', function(req, res){
     res.render('profile', { user: users[0] })
});
app.use('/account', accountRoutes);
app.use('/services', servicesRoutes);

app.listen(port, function() {
    console.log(`Server is up and running on port :${port}`);
});