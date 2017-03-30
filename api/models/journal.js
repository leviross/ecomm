var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var JournalModel = new mongoose.Schema({
    Date: String,
    Day: String,
    Entry: String,
    BodyFeeling: String,
    EmotionalFeeling: String,
    SpiritualFeeling: String
}, { collection: 'journal' });

module.exports = mongoose.model('Journal', JournalModel);