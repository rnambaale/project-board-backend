import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import cors from "cors";
//import errorhandler from "errorhandler";
//import passport from "passport";
import config from "./db/config/config";
import router from "./routes/index";

// Create global app object
const app = express();

app.use(cors());

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// for parsing application/json
app.use(bodyParser.json());

app.use(session({ secret: "library" }));

app.get("/", (req, res) => {
  res.status(200).json({
    status: 200,
    message: "The Project Board Back-end"
  });
});

app.use(router);

// catch 404 and forward to error handler
app.use("*", (req, res, next) => {
  const err = new Error("Route Not Found");
  err.status = 404;
  next(err);
});

//var port = config.port;

const server = app.listen(config.port, function(error) {
  console.log("App listening on port: " + config.port);
});

export default server;
