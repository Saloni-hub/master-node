const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const app = express();
const tourRoute = require("./routes/tourRoutes")
const userRouter = require("./routes/userRoutes")


// MIDDLEWARE
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); // morgan is a HTTP request logger middleware for Express.js applications. It helps you log details of every incoming request to your server. use for debugging ,Monitoring API Activity,Useful in Development
}
app.use(express.json()); // convert body in json if not add middleware then body is undefined

// server static file
app.use(express.static(`${__dirname}/public`)); // serve static file in public folder

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// morgan very popular middleware for login

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from server", app: "natours" });
});


// ROUTE HANDLER

app.use("/api/v1/tours",tourRoute)
app.use("/api/v1/users",userRouter)


module.exports = app;