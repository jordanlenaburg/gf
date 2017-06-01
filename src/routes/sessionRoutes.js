var express = require("express");
var sessionRouter = express.Router();
var Session = require("../models/game");

sessionRouter.route("/")
    .get(function (req, res) {
    Session.find({user: req.user._id}, function (err, sessions) {
        if (err) res.status(500).send(err);
        else res.send(sessions);
    });
})
    .post(function (req, res) {
    var newSession = new Session(req.body);
    newSession.user = req.user._id;

    newSession.save(function (err, session) {
        if (err) res.status(500).send(err);
        else res.status(201).send(session);
    });
});

sessionRouter.route("/:sessionId")
    .get(function (req, res) {
    Session.findOne({_id: req.params.sessionId, user: req.user._id}, function (err, session) {
        if (err) res.status(500).send(err);
        else res.send(session);
    });
})
    .put(function (req, res) {
    Session.findOneAndUpdate({_id: req.params.gameId, user: req.user._id}, req.body, {new: true}, function(err, session) {
        if (err) res.status(500).send(err);
        else res.send(session);
    });
})
    .delete(function (req, res) {
    Session.findOneAndRemove({_id: req.params.gameId, user: req.user._id}, function(err, session) {
        if (err) res.status(500).send(err);
        else res.send(session);
    });
});

module.exports = sessionRouter;
