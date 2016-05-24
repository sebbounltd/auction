var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;
var bodyParser = require('body-parser');
var querystring = require('querystring');
var url = require('url');
var passport = require('passport');
var passportlocal = require('passport-local');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var Account = require('../Models/account');
var Auktion = require('../Models/auktion');
var flash = require('connect-flash');


function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        next();
    } else  {
        req.flash('error', 'Bitte Melde dich an um Fortzufahren');
        res.redirect('/login');
    }
}

function notensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        res.redirect('/');
    } else  {
        next();
    }
}


// POST Page
router.post('/login', notensureAuthenticated, passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
    }),
    function(req, res) {
    res.redirect('/');
});

router.post('/Registrieren', notensureAuthenticated, function(req, res) {

    var newUser = new Account({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        geschlecht: req.body.gender,
        geburtsdatum: req.body.bday,
        vorname: req.body.name1,
        nachname: req.body.lastname,
        strasse: req.body.street,
        hausnummer: req.body.housenumber,
        plz: req.body.place,
        ort: req.body.zip,
        telefonnummer: req.body.phonenumber
    });

    var password = req.body.password;

    newUser.generateHash(password, function(err, hash) {
        if (err) {
            return next(err);
        } else {
            newUser.password = hash;
            newUser.save(function(err, results) {
                if (err) {
                    req.flash('Rerror', 'Diese Email Adresse existiert berreits' );
                    return res.redirect('/Registrieren');
                } else {
                    req.logIn(newUser, function(err) {
                        if (err) { return next(err);}
                        return res.redirect('/');
                    });
                }
            });
        }
    });
});

router.post('/Verkaufen', ensureAuthenticated, function(req, res) {

    var newAuction = new Auktion({
        titel: req.body.titel,
        kategorie: req.body.kategorie,
        beschreibung: req.body.text,
        startpreis: req.body.price,
        sofortpreis: req.body.pricenow,
        dauer: req.body.dauer,
        plz: req.body.plz,
        ort: req.body.ort,
        verkaufer: req.user.id,
        username: req.user.username,
        start: new Date()
    });

    newAuction.save(function(err, results) {
        if (err) {
            return res.redirect('/Verkaufen');
        } else {
            res.redirect('/');
        }
    });

});




// GET Page
router.get('/', function(req, res, next) {
    res.render('index', {user: req.user});

});

router.get('/profil/:id', function(req, res){
    var id = req.params.id;
    Account.findById(id, function(err, user){
        if(err){
            console.log(err);
            return res.status(500).send();
        }
        if(!user) {return res.redirect('/404');}

        else{
            if(req.isAuthenticated() && req.user.id === id){
                    res.render('profil', {
                    userfind: 5,
                    user: req.user
                })
            }else{
            res.render('profil', {
                userfind: user,
                user: req.user
            })}
        }
    })
});

router.get('/Auktion/:titel', function(req, res){
    var titel = req.params.titel;
        Auktion.findOne({titel: titel}, function(err, auktion){
            if(err){
                console.log(err);
                return res.status(500).send();
            }
            if(!auktion){
                return res.redirect('/404');
            }else{
            res.render('Auktion', {
                user: req.user,
                Auktion: auktion
            })
            }
        })
});

router.get('/login', notensureAuthenticated, function(req, res){
    res.render('login', { user: req.user, message: req.flash('error')});
});

router.get('/Registrieren', notensureAuthenticated, function(req, res){
    res.render('register', {user: req.user, Rmessage: req.flash('Rerror')});
});

router.get('/checkemail', notensureAuthenticated, function(req, res){
    var params = req.url.split('?')[1];
    var data = querystring.parse(params);
    var email = data.email;

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    Account.findOne({email: email}, function(err, user){
        if(err){
            console.log(err);
            return res.status(500).send();
        }
        if(!user){
            res.write('"true"');
            res.end();
        } else{
            res.write('""');
            res.end();
        }
    });
});

router.get('/checkusername', notensureAuthenticated, function(req, res){
    var params = req.url.split('?')[1];
    var data = querystring.parse(params);
    var username = data.email;

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    Account.findOne({username: username}, function(err, user){
        if(err){
            console.log(err);
            return res.status(500).send();
        }
        if(!user){
            res.write('"true"');
            res.end();
        } else{
            res.write('""');
            res.end();
        }
    });
});

router.get('/logout', ensureAuthenticated, function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/Verkaufen', ensureAuthenticated, function(req, res){
    res.render('Verkaufen',{ user: req.user});
});

router.get('/Gebuehren', function(req, res){
    res.render('Gebuehren',{ user: req.user});
});

router.get('/Impressum', function(req, res){
    res.render('impressum',{ user: req.user});
});

router.get('/AGB', function(req, res){
    res.render('AGB',{ user: req.user});
});

module.exports = router;
