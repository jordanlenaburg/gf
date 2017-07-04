var express = require("express");
var sessionRouter = express.Router();
var Session = require("../models/session");
var Game = require("../models/game");
var User = require("../models/user");
var Store = require("../models/store");



sessionRouter.route("/makeStoreFavorite/:storeId")
    .get(function (req, res) {
        User.update({
            _id: req.user._id
        }, {
            $set: {
                myStore: req.params.storeId
            }
        }, function (err, user) {
            if (err) {
                return res.status(400).send({
                    success: false,
                    message: "There has been a glitch in the Matrix.  Get out of there!"
                })
            } else {
                return res.status(201).send({
                    success: true,
                    message: "Playing favorites, are we?  Shame."
                })

            }
        })
    })

sessionRouter.route("/deleteMySession/:sessionId")
    .delete(function (req, res) {
        Session.findOne({
            _id: req.params.sessionId
        }, function (err, session) {
            console.log('----deleteMySession----session.findone---')
            console.log(session)
            if (err) {
                res.status(500).send(err)
            } else {
                if (session._owner === req.user._id) {
                    User.findOne({
                            _id: req.user._id
                        }, function (err, user) {
                            if (err) {
                                res.status(500).send(err)
                            } else {
                                for (var i = 0; i < user._sessionsJoined.length; i++) {
                                    if (user._sessionsJoined[i] == req.params.sessionId) {
                                        user._sessionsJoined.splice(i, 1)
                                    }
                                }
                                user.save(function (err) {
                                    if (err) res.status(500).send(err)
                                    else {
                                        Store.findOne({
                                            _id: session._store
                                        }, function (err, store) {
                                            if (err) {
                                                res.status(500).send(err)
                                            } else {
                                                for (var i = 0; i < store._sessions.length; i++) {
                                                    if (store._sessions[i] === session._id) {
                                                        store._sessions.splice(i, 1);

                                                    }
                                                }
                                                store.save(function (err) {
                                                    if (err) res.status(500).send(err)
                                                    else {
                                                        session.remove({
                                                                _id: req.params.sessionId
                                                            }, function (err) {
                                                                if (err) {
                                                                    return res.status(400).send({
                                                                        success: false,
                                                                        message: "The function of the One is to return this session to the Source.  You did not, thus you are not the One."
                                                                    })
                                                                } else {
                                                                    return res.status(201).send({
                                                                        success: true,
                                                                        message: "Do not try and bend the spoon. That's impossible. Instead... only try to realize the truth.  There is no Session."
                                                                    })
                                                                }
                                                            }) //.remove
                                                    }
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                        }

                    )
                }
            }
        })
    })



sessionRouter.route("/")
    .get(function (req, res) {
        Session.find({
            user: req.user._id
        }, function (err, sessions) {
            if (err) res.status(500).send(err);
            else res.send(sessions);
        });
    })
    //CREATE a session
    .post(function (req, res) {
        var newSession = new Session(req.body);
        newSession._owner = req.user._id;
        newSession._store = req.body._store;
        newSession._players.push(req.user._id);

        newSession.save(function (err, session) {
            session._game = req.body._game.name;
            if (err) {
                res.status(500).send(err)
            } else {
                Store.findOne({
                    _id: req.body._store
                }, function (error, store) {
                    if (error) {
                        return handleError(error);
                    } else {
                        store._sessions.push(session._id);
                        store.save(function (err, store) {
                            if (err) res.status(500).send(err)
                            else {
                                User.findOne({
                                    _id: req.user._id
                                }, function (err, user) {
                                    if (err) {
                                        return res.status(400).send({
                                            success: false,
                                            message: "Unable to add you to your own game.  Weird."
                                        })
                                    } else {
                                        user._sessionsJoined.push(session._id);
                                        user.save(function (err, user) {
                                            if (err) res.status(500).send(err)
                                            else {
                                                message = {
                                                    success: true,
                                                    message: "You joined your own game.  Presumptuous."
                                                }
                                                res.status(201).send({
                                                    session, message
                                                })
                                            }
                                        })


                                    }
                                })

                            }


                        })
                    }
                })
            }
        })
    })


sessionRouter.route("/sessions")
    .get(function (req, res) {
        User.findOne({
            _id: req.user._id
        }).
//        populate('_sessionsJoined').
        populate({ path:'_sessionsJoined'}).
        populate('_game').
        populate('myStore').
        exec(function (err, user) {
            if (err) res.status(500).send(err)
            else {
                res.status(201).send(user)
            }
        })
    })

sessionRouter.route("/exitSession/:sessionId")
    .get(function (req, res) {


        Session.findOne({
                _id: req.params.sessionId
            }, function (err, session) {
                if (err) {
                    res.status(500).send(err)
                } else {
                    if (session._players.length >= session.maxPlayers) {
                        return res.status(400).send({
                            success: false,
                            message: "You know you are NOT in that game session.  Stop it."
                        })
                    } else {
                        Session.update({
                            _id: req.params.sessionId
                        }, {
                            $pull: {
                                _players: req.user._id
                            }
                        }, function (err, session) {
                            if (!session) {
                                return res.status(400).send({
                                    success: false,
                                    message: "Can't find that session...weird."
                                })
                            } else {
                                User.update({
                                    _id: req.user._id
                                }, {
                                    $pull: {
                                        _sessionsJoined: req.params.sessionId
                                    }
                                }, function (err, user) {
                                    if (!user) {
                                        return res.status(400).send({
                                            success: false,
                                            message: "Update error --> user not found in the Matrix..."
                                        })
                                    } else {
                                        res.status(201).send({
                                            success: true,
                                            message: "Deleted from session.  Don't cry."
                                        });
                                    }
                                })
                            }

                        })



                    }
                }
            }) //clsoe findOne



    }) //close route


sessionRouter.route("/joinSession/:sessionId")
    .get(function (req, res) {

        Session.findOne({
            _id: req.params.sessionId
        }, function (err, session) {
            if (err) res.status(500).send(err);
            else {
                if (session._players.length < session.maxPlayers) {
                    Session.update({
                            _id: req.params.sessionId
                        }, {
                            $addToSet: {
                                _players: req.user._id
                            }
                        },
                        function (err, session) {
                            if (!session) {
                                return res.status(400).send({
                                    success: false,
                                    message: "You're already part of that Session, silly!"
                                })
                            } else {
                                User.update({
                                        _id: req.user._id
                                    }, {
                                        $addToSet: {
                                            _sessionsJoined: req.params.sessionId
                                        }
                                    },
                                    function (err, user) {
                                        if (!user) {
                                            return res.status(400).send({
                                                success: false,
                                                message: "User not found in the Matrix..."
                                            })
                                        } else {
                                            res.status(201).send({
                                                success: true,
                                                message: "You're on the list...sweet!"
                                            });
                                        }
                                    })

                            }
                        }
                    )
                } else {
                    res.status(201).send({
                        success: false,
                        message: "It's full! Nooooooooooo!!!!!!!"
                    })
                }
            }
        });



    }) //end of route

sessionRouter.route("/:sessionId")
    .get(function (req, res) {
        Session.findOne({
            _id: req.params.sessionId,
            user: req.user._id
        }, function (err, session) {
            if (err) res.status(500).send(err);
            else res.send(session);
        });
    })
    .put(function (req, res) {
        Session.findOneAndUpdate({
            _id: req.params.gameId,
            user: req.user._id
        }, req.body, {
            new: true
        }, function (err, session) {
            if (err) res.status(500).send(err);
            else res.send(session);
        });
    })
    .delete(function (req, res) {
        Session.findOneAndRemove({
            _id: req.params.gameId,
            user: req.user._id
        }, function (err, session) {
            if (err) res.status(500).send(err);
            else res.send(session);
        });
    });

module.exports = sessionRouter;
