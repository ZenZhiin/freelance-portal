const express = require('express');
const router = express.Router();
var db = require("../models");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const ifNotLoggedin = (req, res, next) => {
  if(!req.session.isLoggedIn){
      return res.render('login-register');
  }
  next();
}

const ifLoggedin = (req,res,next) => {
  if(req.session.isLoggedIn){
      return res.redirect('/');
  }
  next();
}

router.get('/', function(req, res, next) {
  res.locals.session = req.session;
  db.userdetails.findAll({
  }).then(function (result) {
    res.render("index", { userdetails : result });
  });
});

router.get('/about', function(req, res, next) {
  res.render("about");
});

router.post('/register', (req,res,next) => {
    const validation_result = validationResult(req);
    if(validation_result.isEmpty()){
      db.users.findAll({
        where: 
        {
          "email":req.body.email
        }
      }).then(function (result) {
        if(result.length > 0){
          res.render("login-register", { error_msg : "This email has already register. Please try login or click forgot password if you forgot your password."});
        }
        else{
          bcrypt.hash(req.body.password, 12).then((hash_password)=> {
            console.log(hash_password);
            db.users.create({
              "email" : req.body.email,
              "password" : hash_password,
              "active": true
            }).then(result => {
              db.userdetails.create({
                "firstname": req.body.firstname,
                "lastname": req.body.lastname,
                "email": req.body.email,
                "phone": req.body.phone ? req.body.phone : "",
                "user_id": result.id,
                "experiences" : req.body.experiences ? req.body.experiences : "",
                "skillset": req.body.skillset ? req.body.skillset : "",
                "hobby": req.body.hobby ? req.body.hobby : "",
                "achievement": req.body.achievement ? req.body.achievement : ""
              }); 
            });
            res.redirect('/');
          })
          .catch(err => {
            if (err) throw err;
          })
        }
      });
    }
    else{
        let allErrors = validation_result.errors.map((error) => {
            return error.msg;
        });
        res.render('login-register',{
           register_error:allErrors,
           old_data:req.body
        });
    }
});

router.get('/login', (req,res) =>{
  res.render('login-register');
}).post('/login', ifLoggedin, (req, res, next) => {
  const validation_result = validationResult(req);
  if(validation_result.isEmpty()){
      db.users.findAll({
        where: 
        {
          "email": req.body.email
        }
      }).then(function (result) {
        bcrypt.compare(req.body.password, result[0].password).then(compare_result => {
          if(compare_result === true){
            req.session.isLoggedIn = true;
            req.session.userID = result[0].id;
            res.redirect('/');
          }
          else{
              res.render('login-register',{
                  login_errors:['Invalid Password!']
              });
            }
        }) 
      })
  }
  else{
      let allErrors = validation_result.errors.map((error) => {
          return error.msg;
      });
      res.render('login-register',{
          login_errors: allErrors
      });
  }
});

router.get('/logout',(req,res)=>{
  req.session = null;
  res.redirect('/');
});

module.exports = router;