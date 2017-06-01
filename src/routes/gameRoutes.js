var express = require("express");
var gameRouter = express.Router();
var Game = require("../models/game");

gameRouter.route("/")
    .get(function (req, res) {
        Game.find({user: req.user._id}, function (err, games) {
            if (err) res.status(500).send(err);
            else res.send(games);
        });
    })
    .post(function (req, res) {
        var newGame = new Game(req.body);
        newGame.user = req.user._id;

        newGame.save(function (err, game) {
            if (err) res.status(500).send(err);
            else res.status(201).send(game);
        });
    });

gameRouter.route("/:gameId")
    .get(function (req, res) {
        Game.findOne({_id: req.params.gameId, user: req.user._id}, function (err, game) {
            if (err) res.status(500).send(err);
            else res.send(game);
        });
    })
    .put(function (req, res) {
        Game.findOneAndUpdate({_id: req.params.gameId, user: req.user._id}, req.body, {new: true}, function(err, game) {
            if (err) res.status(500).send(err);
            else res.send(game);
        });
    })
    .delete(function (req, res) {
        Game.findOneAndRemove({_id: req.params.gameId, user: req.user._id}, function(err, game) {
            if (err) res.status(500).send(err);
            else res.send(game);
        });
    });

module.exports = gameRouter;
