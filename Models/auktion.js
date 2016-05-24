var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Auktion = new Schema({
    titel: String,
    kategorie: String,
    beschreibung: String,
    startpreis: Number,
    sofortpreis: Number,
    dauer: Number,
    plz: Number,
    ort: String,
    verkaufer: String,
    username: String,
    start: Date
});

var User = mongoose.model('Auktion', Auktion);

module.exports = User;
