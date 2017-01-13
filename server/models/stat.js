var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StatSchema = new Schema({

    loc: String,
    count: Number,
	
	//TODO: update format of below to work with app
	
    date: //Day in format: MM/DD/YYYY
	{
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Stat', StatSchema);