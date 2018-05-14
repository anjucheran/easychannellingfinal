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

//get cities list from database
let cities;
City.find({}, (err, allCities) => {
  if(err) {
    console.log(err);
  } else {
    cities = allCities;
  }
});

//new centre form
router.get('/new', (req, res) => {
  res.render('newCentre', {cities: cities});
});

//new centre post
router.post('/', (req, res) => {
  const name = req.body.name;
  const slmcreg = req.body.slmcreg;
  const address = req.body.address;
  const city = req.body.city;
  const contact = req.body.contact;
  const id = req.user.id;
  //saving centre
  let centre = new Centre();
  centre.name = name;
  centre.slmcreg = slmcreg;
  centre.address = address;
  centre.city = city;
  centre.contact = contact;
  centre.save();
  //add centre to city
  City.findOne({name: city}, (err, city) => {
    if(err) {
      console.log(err);
    } else {
      city.centres.push(centre._id);
      city.save();
    }
  });
  //add centre to owner
  Owner.findOne({user: id}, (err, owner) => {
    if(err) {
      console.log(err);
    } else {
      owner.centres.push(centre._id);
      owner.save();
    }
  });
  res.redirect('/secret');
});

module.exports = router;