var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var storeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String
//        required: true
    },
    website: {
        type: String
    },
    streetAddy: {
        type: String
//        required: true
    },
    city: {
        type: String
//        required: true
    },
    state: {
        type: String
//        required: true
    },
    zip: {
        type: String
//        required: true
    },
    hours: {
        mon: {
            open: Number,
            close: Number
        },
        tue: {
            open: Number,
            close: Number
        },
        wed: {
            open: Number,
            close: Number
        },
        thur: {
            open: Number,
            close: Number
        },
        fri: {
            open: Number,
            close: Number
        },
        sat: {
            open: Number,
            close: Number
        },
        sun: {
            open: Number,
            close: Number
        }
    },
    gamingTables: Number,
    description: String,
    _sessions: [{
        type: Schema.Types.ObjectId,
        ref: 'Session'
    }]
});

module.exports = mongoose.model("Store", storeSchema);
