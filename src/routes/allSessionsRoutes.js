var express = require("express");
var allSessionsRouter = express.Router();

var Store = require("../models/store");
var Session = require("../models/session");
var Game = require("../models/game")

allSessionsRouter.route("/:storeId")
    .get(function (req, res) {
        Session.
        find({
            _store: req.params.storeId
        }).
        populate('_game').
        populate('_players').
        populate('_owner').
        exec(function (err, sessions) {
            console.log(sessions);
            if (err) {
                return handleError(err)
            } else {
                res.status(201).send(sessions);
            }
        })
    })

module.exports = allSessionsRouter;
