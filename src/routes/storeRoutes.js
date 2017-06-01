var express = require("express");
var storeRouter = express.Router();
var Store = require("../models/store");

storeRouter.route("/")
    .get(function (req, res) {
    Store.find({user: req.user._id}, function (err, stores) {
        if (err) res.status(500).send(err);
        else res.send(stores);
    });
})
    .post(function (req, res) {
    var newStore = new Store(req.body);
    newStore.user = req.user._id;

    newStore.save(function (err, store) {
        if (err) res.status(500).send(err);
        else res.status(201).send(store);
    });
});

storeRouter.route("/:storeId")
    .get(function (req, res) {
    Store.findOne({_id: req.params.storeId, user: req.user._id}, function (err, store) {
        if (err) res.status(500).send(err);
        else res.send(store);
    });
})
    .put(function (req, res) {
    Store.findOneAndUpdate({_id: req.params.storeId, user: req.user._id}, req.body, {new: true}, function(err, store) {
        if (err) res.status(500).send(err);
        else res.send(store);
    });
})
    .delete(function (req, res) {
    Store.findOneAndRemove({_id: req.params.storeId, user: req.user._id}, function(err, store) {
        if (err) res.status(500).send(err);
        else res.send(store);
    });
});

module.exports = storeRouter;
