var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var sessionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    dateOfSession: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    timeStart: {
        type:String,
        required: true
    },
    minPlayers: {
        type: Number,
        required: true
    },
    maxPlayers: {
        type: Number,
        required: true
    },
    estimatedGameLength: String,
    _game:[{type: Number, ref: 'Game' }],
    _owner: [{ type: Number, ref: 'User' }],
    _players: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    description: String,
    referenceWebsite: String
});

module.exports = mongoose.model("Game", gameSchema);
