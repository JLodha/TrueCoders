var express = require('express');
var router = express.Router();
var db=require('../database');
/* GET users listing. */
router.get('/teacherlogin', function(req, res, next) {
  res.render('teacher-login');
});
router.post('/teacherlogin', function(req, res){
    var emailAddress = req.body.email_address;
    var password = req.body.password;
    var sql='SELECT * FROM registration_teacher WHERE email_address =? AND password =?';
    db.query(sql, [emailAddress, password], function (err, data, fields) {
        if(err) throw err
        if(data.length>0){
            req.session.loggedinUser= true;
            req.session.emailAddress= emailAddress;
            res.redirect('/dashboard');
        }else{
            res.render('teacher-login',{alertMsg:"Your Email Address or password is wrong"});
        }
    })
})
module.exports = router;