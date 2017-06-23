var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");

var userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/, 'Make it real or else forget about it...']
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    dateJoined: {
        type: Date,
        default: Date.now
    },
    state: {
        type: String,
        required: true
    },
    _sessionsJoined: [],
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

userSchema.pre("save", function (next) {
    var user = this;
    if (!user.isModified("password")) {
        return next();
    } else {
        // hash the password
        bcrypt.hash(user.password, 10, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    }
});

userSchema.methods.checkPassword = function(passwordAttempt, callback) {
    bcrypt.compare(passwordAttempt, this.password, function (err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

userSchema.methods.withoutPassword = function() {
    var user = this.toObject();
    delete user.password;
    return user;
};

module.exports = mongoose.model("User", userSchema);
