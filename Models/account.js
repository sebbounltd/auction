var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR;
var Schema = mongoose.Schema;

if (process.env.NODE_ENV === 'test') {
        SALT_WORK_FACTOR = 1;
} else {
        SALT_WORK_FACTOR = 10;
}

var Account = new Schema({
        username: String,
        password: String,
        email: String,
        geschlecht: String,
        geburtsdatum: String,
        vorname: String,
        nachname: String,
        strasse: String,
        hausnummer: String,
        ort: String,
        plz: String,
        telefonnummer: String
});

Account.methods.generateHash = function(password, callback) {
        bcrypt.genSalt(10, function(err, salt) {
                if (err) {
                        return next(err);
                }
                bcrypt.hash(password, salt, function(err, hash) {
                        if (err) {
                                return next(err);
                        }
                        return callback(err, hash);
                });
        });
};

Account.methods.comparePassword = function(password, done) {
        bcrypt.compare(password, this.password, function(err, isMatch) {
                if (err) {
                        return done(err);
                }
                return done(null, isMatch);
        });
};

var User = mongoose.model('Account', Account);

module.exports = User;
