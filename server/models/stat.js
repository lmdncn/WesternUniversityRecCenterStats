var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StatSchema = new Schema({

    loc: String,
    count: Number,
	
	//TODO: update format of below to work with app
	
    date: //Day in format: MM/DD/YYYY
	{
        type: String,
        default: "00/00/0000"
    },
	time: //Time in format: 24hour:min
	{
		type:String,
		default: "No Time"
	}
});

module.exports = mongoose.model('Stat', StatSchema);