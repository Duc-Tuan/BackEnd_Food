require("dotenv").config();
const express = require("express");
const mongodb = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();

// const users = require("./Routers/UsersRouter");

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  // Pass to next layer of middleware
  next();
});

// mongodb.set("strictQuery", false);
mongodb
  .connect(process.env.URL_MONGOODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection success"))
  .catch((error) => console.error(`connection failed ${error}`));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));

// app.use("/users", users);

// Router
app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Server is OK!",
  });
});

//catch 404 error and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler function
app.use((err, req, res, next) => {
  const error = app.get("env") === "development" ? err : {};
  const status = err.status || 500;

  // response to client
  return res.status(status).json({
    error: {
      message: error.message,
    },
  });
});

const PORT = process.env.PORT || 3036;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
