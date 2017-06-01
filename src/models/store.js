var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var storeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    streetAddy: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    hours: String,
    gamingTables: Number,
    description: String,
});

module.exports = mongoose.model("Store", storeSchema);
