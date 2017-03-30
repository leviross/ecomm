var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var JournalModel = new mongoose.Schema({
    Date: Date,
    Day: String,
    Entry: String,
    BodyFeeling: String,
    EmotionalFeeling: String,
    SpiritualFeeling: String
}, { collection: 'journal' });

module.exports = mongoose.model('Journal', JournalModel);