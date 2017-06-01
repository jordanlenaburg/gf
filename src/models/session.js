var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var sessionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    gameBeingPlayed:[{ type: Schema.Types.ObjectId, ref: 'Game' }],
    creator: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    description: String,
    referenceWebsite: String
});

module.exports = mongoose.model("Game", gameSchema);
