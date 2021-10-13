const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const port =  3000;
app.set('views', path.join(__dirname, '/views'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));
const { accounts, writeJSON, users } = require('./data.js');

// const accountData = fs.readFileSync(path.join(__dirname, 'json', 'accounts.json'), 'utf8');
// const accounts = JSON.parse(accountData);

// const userData = fs.readFileSync(path.join(__dirname, 'json', 'users.json'), 'utf8');
// const users = JSON.parse(userData);

app.get('/', function (req, res) {
    res.render('index', {
        title: "Account Summary",
        accounts: accounts 
    });
});
app.get('/profile', function(req, res){
     res.render('profile', { user: users[0] })
});

app.get('/credit', function(req, res){
    res.render('account', { account: accounts.credit })
});

app.get('/savings', function(req, res){
    res.render('account', { account: accounts.savings })
});

app.get('/checking', function(req, res){ 
    res.render('account', { account: accounts.checking })
});

app.get('/transfer', function(req, res){
     res.render('transfer')
});

app.post('/transfer', function(req, res){
    accounts[req.body.from].balance -= req.body.amount;
    accounts[req.body.to].balance += parseInt(req.body.amount, 10);
    writeJSON();
    res.render('transfer', {message: 'Transfer Completed'});
});

app.get('/payment', function(req, res) { 
    res.render('payment', {account: accounts.credit})
});

app.post('/payment', function(req, res) {
    accounts.credit.balance -= req.body.amount;
    accounts.credit.available += parseInt(req.body.amount);
    writeJSON();
    res.render('payment', {message: 'Payment Successful', account: accounts.credit});
});

app.listen(port, function() {
    console.log(`Server is up and running on port :${port}`);
});