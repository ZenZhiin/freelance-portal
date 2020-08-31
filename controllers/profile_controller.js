const express = require('express');
const router = express.Router();
var db = require("../models");

router.get('/profile', function(req, res) {
  db.userdetails.findAll({
    where : {
      "id" : req.session.userID
    }
  }).then(function (result) {
    res.render("profile", { userdetails : result[0] });
  });
});

router.get('/editprofile', function(req, res) {
    db.userdetails.findAll({
      where : {
        "id" : req.session.userID
      }
    }).then(function (result) {
      res.render("editprofile", { userdetails : result[0] });
    });
}).post('/editprofile', function(req,res){
  var value = {
    "firstname": req.body.firstname,
    "lastname": req.body.lastname,
    "email": req.body.email,
    "phone": req.body.phone ? req.body.phone : "",
    "experiences" : req.body.experiences ? req.body.experiences : "",
    "skillset": req.body.skillset ? req.body.skillset : "",
    "hobby": req.body.hobby ? req.body.hobby : "",
    "achievement": req.body.achievement ? req.body.achievement : ""
  }
  db.userdetails.update(value,{
    where :{
      "user_id" : req.session.userID
    }
  }).then((result) => {
    res.render("/");
  });
});


router.get('/deleteprofile', function(req, res) {
  db.users.destroy({where :{
    "id" : req.session.userID
  }});
  db.userdetails.destroy({where :{
    "user_id" : req.session.userID
  }});
  req.session = null;
  res.redirect('/');
});

module.exports = router;