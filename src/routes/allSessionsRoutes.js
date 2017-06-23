var express = require("express");
var allSessionsRouter = express.Router();
var allSessions = require("../models/game");

allSessionsRouter.route("/")
    .get(function (req, res) {
        allSessions.find({
            user: req.user._id
        }, function (err, sessions) {
            if (err) res.status(500).send(err);
            else res.send(sessions);
        });
    })
//allSessionsRouter.route("/:sessionId")
//    .get(function (req, res) {
//        allSessions.findOne({
//            _id: req.params.sessionId,
//            user: req.user._id
//        }, function (err, game) {
//            if (err) res.status(500).send(err);
//            else res.send(session);
//        });
//    })

module.exports = allSessionsRouter;
