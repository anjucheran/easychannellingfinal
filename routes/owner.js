//constant inializing
const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');

//models
const User = require('../models/user');
const Owner = require('../models/owner');
const Centre = require('../models/centre');
const Operator = require('../models/operator');
const City = require('../models/city');
const Doctor = require('../models/doctor');

//passport configuration
router.use(require('express-session')({
  secret: 'Your Best Echannelling Platform.',
  resave: true,
  saveUninitialized: true
}));
router.use(passport.initialize());
router.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//owner homepage
router.get('/home', (req, res) => {
  Owner.findOne({user: req.user._id}).populate('centres').exec((err, owner) => {
    if(err) {
      console.log(err);
      return res.redirect('/');
    }
    const centres = owner.centres;
    return res.render('ownerHome', {name: req.user.name, centres: centres});
  });
});

//Owners' centre view
router.get('/centre/:id', (req, res) => {
  res.render('ownerCentre');
});

module.exports = router;