var express = require('express');
var router = express.Router();

const isLogged = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};
/* GET home page. */

router.get('/', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  //${req.user.displayName}
  res.send(`Welcome mr ${req.user ? req.user.displayName : 'undefined'}`);
  console.log(req.user);
});

module.exports = router;
