var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var gameSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    needEquipment: {
        type: Boolean,
        default: false
    },
    minPlayers: Number,
    maxPlayers: Number,
    description: String,
    referenceWebsite1: String,
    referenceWebsite2: String
});

module.exports = mongoose.model("Game", gameSchema);
