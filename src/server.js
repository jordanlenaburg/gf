var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cors = require("cors");
var morgan = require("morgan");
var config = require("./config");
var path = require("path");
var port = process.env.PORT || 8000;
var expressJwt = require("express-jwt");

mongoose.connect(config.database, function() {
    console.log("---->Mongo Go<----");
});

app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "..", "public")));
//app.disable('etag'); //looking to eliminate 304 blank page error on 'createSession'--couldn't get it

app.use("/api", expressJwt({secret: config.secret}));//added security prefix
app.use("/auth/change-password", expressJwt({secret: config.secret}));
app.use("/auth", require("./routes/authRoutes"));

app.use("/games", require("./routes/gameRoutes"));
app.use("/stores/", require("./routes/storeRoutes"));

app.use("/api/sessionMaster", require("./routes/sessionRoutes"));
app.use("/storeSessions", require("./routes/allSessionsRoutes"));


app.listen(port, function() {
    console.log("Mongoose is loose --> " + port);
});
