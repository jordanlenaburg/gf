var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var gameSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    maxPlayers: Number,
    description: String,
    referenceWebsite: String
});

module.exports = mongoose.model("Game", gameSchema);
