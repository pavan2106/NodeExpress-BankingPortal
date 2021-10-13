const fs = require('fs');
const path = require('path');
const express = require('express');
//const { response } = require('express');
//const request = require('request');
const app = express();
const port =  3000;
// const { accounts} = require('./json/accounts.json');

// app.get('/', funtion(request, response){

//     response.render('index.ejs', {
//         name: req.params.name,
//         quote: quote
//       });
// });
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));

const accountData = fs.readFileSync(path.join(__dirname, 'json', 'accounts.json'), 'utf8');
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync(path.join(__dirname, 'json', 'users.json'), 'utf8');
const users = JSON.parse(userData);

// const writeJSON = () => {
//     let accountsJSON = JSON.stringify(accounts, null, 4)
//     fs.writeFileSync(path.join(__dirname, 'json','accounts.json'), accountsJSON, 'utf8');
// }
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

app.listen(port, function() {
    console.log(`Server is up and running on port :${port}`);
});