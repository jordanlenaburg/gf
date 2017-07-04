var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var sessionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    dateOfSession: {
        type: Date
        //required: true
    },
    expireDate: {
        type: Date,
        expires: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    timeStart: {
        type: String
            //        required: true
    },
    minPlayers: {
        type: Number
            //        required: true
    },
    maxPlayers: {
        type: Number
            //        required: true
    },
    estimatedGameLength: String,
    _store: {
        type: String,
        ref: 'Store'
    },
    _game: {
        type: String,
        ref: 'Game'
    },
    _owner: {
        type: String,
        ref: 'User'
    },
    _players: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    description: String,
    referenceWebsite: String
});

module.exports = mongoose.model("Session", sessionSchema);
