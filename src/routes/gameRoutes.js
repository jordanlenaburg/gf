var express = require("express");
var gameRouter = express.Router();
var Game = require("../models/game");

gameRouter.route("/")
    .get(function (req, res) {
        console.log('game route');
        Game.find({}, function (err, games) {
            console.log(games);
            if (err) res.status(500).send(err);
            else res.send(games);
        });
    })

gameRouter.route("/:gameId")
    .get(function (req, res) {
        Game.findOne({_id: req.params.gameId}, function (err, game) {
            if (err) res.status(500).send(err);
            else res.send(game);
        });
    })


module.exports = gameRouter;
