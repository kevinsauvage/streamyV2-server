import http from "http";
import express from "express";
import logger from "morgan";
import cors from "cors";
// mongo connection
import "./config/mongo.js";
// routes
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import commentRouter from "./routes/comment.js";
// middlewares
import { decode } from "./middlewares/jwt.js";
import config from "./config/cors.js";

const app = express();

import bodyParser from "body-parser";
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

/** Get port from environment and store in Express. */
const port = process.env.PORT || "5000";
app.set("port", port);

// cors whitelist
app.use(
  cors({
    origin: (origin, callback) => {
      if (config.cors.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        const error = new Error("Not allowed by CORS");
        error.status = 403;
        callback(error);
      }
    },
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/login", authRouter);
app.use("/users", userRouter);
app.use("/comments", decode, commentRouter);

/** catch 404 and forward to error handler */
app.use("*", (req, res) => {
  return res.status(404).json({
    success: false,
    message: "API endpoint doesnt exist",
  });
});

/** Create HTTP server. */
const server = http.createServer(app);
/** Listen on provided port, on all network interfaces. */
server.listen(port);
/** Event listener for HTTP server "listening" event. */
server.on("listening", () => {
  console.log(`Listening on port:: http://localhost:${port}/`);
});
