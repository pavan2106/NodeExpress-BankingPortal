const express = require('express');
const router = express.Router();
const {
    accounts
} = require('../data');

router.get('/credit', function(req, res){
    res.render('account', { account: accounts.credit })
});

router.get('/savings', function(req, res){
    res.render('account', { account: accounts.savings })
});

router.get('/checking', function(req, res){ 
    res.render('account', { account: accounts.checking })
});

module.exports = router;