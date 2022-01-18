// Dependencies
const express = require("express");
// const logsController = require("./controllers/logsController");
const cors = require("cors");

// Configuration
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// app.use("/logs", logsController);

app.get("/", (req, res) => {
  res.send(`Welcome to the Budgeting Server`);
});

app.get("*", (req, res) => {
  res.status(404).json({ error: "Page not found" });
});

module.exports = app;
