var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
const {deslogado} = require('../helper/deslogado')
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/register', function (req, res,) {
  addToDB(req, res);
});


async function addToDB(req, res) {

  var user = new User({
    email: req.body.email,
    username: req.body.username,
    password: User.hashPassword(req.body.password),
    creation_dt: Date.now()
  });

  try {
    doc = await user.save();
    return res.status(201).json(doc);
  }
  catch (err) {
    console.log(err)
    return res.status(501).json(err);
  }
}


router.post('/login', deslogado, function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) { return res.status(501).json(err); }
    if (!user) { return res.status(501).json(info); }
    req.logIn(user, function (err) {
      if (err) { return res.status(501).json(err); }
      return res.status(200).json({ message: 'Login Success' });
    });
  })(req, res, next);
});

/*router.post('/login', (req, res, next) => {
  passport.authenticate("local", {
      successRedirect: "/users/user",
      failureRedirect: "/login",
      failureFlash: true
  })(req, res, next)

})*/

// autenticando o usuario nesta rota

router.get('/user', deslogado, function (req, res) {
  return res.status(200).json(req.user);
});

router.get('/logout', deslogado, function (req, res) {
  req.logout();
  return res.status(200).json({ message: 'Logout Success' });
})

module.exports = router;
