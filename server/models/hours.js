var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HoursSchema = new Schema({
    title: String,
    subtitle: String,
    monO: {
        hour: Number,
        f: String
    },
    monC: {
        hour: Number,
        f: String
    },
    tueO: {
        hour: Number,
        f: String
    },
    tuesC: {
        hour: Number,
        f: String
    },
    wedO: {
        hour: Number,
        f: String
    },
    wedC: {
        hour: Number,
        f: String
    },
    thuO: {
        hour: Number,
        f: String
    },
    thuC: {
        hour: Number,
        f: String
    },
    friO: {
        hour: Number,
        f: String
    },
    friC: {
        hour: Number,
        f: String
    },
    satO: {
        hour: Number,
        f: String
    },
    satC: {
        hour: Number,
        f: String
    },
    sunO: {
        hour: Number,
        f: String
    },
    sunC: {
        hour: Number,
        f: String
    }
});

module.exports = mongoose.model('Hours', HoursSchema);