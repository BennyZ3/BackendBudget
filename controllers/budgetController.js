// Dependencies
const express = require("express");
const { response } = require("../app");
const app = require("../app");

//Files
const transactionsArray = require("../models/transactions").sort((a, b) => {
  return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
});
console.log(transactionsArray);
const budgeter = express.Router();

// Get requests
budgeter.get("/", (request, response) => {
  console.log("Get Request");
  response.json(
    transactionsArray.sort((a, b) => {
      return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
    })
  );
});

budgeter.get("/:id", (request, response) => {
  const { id } = request.params;
  console.log(`Get request to id: ${id}`);
  transactionsArray[id]
    ? response.json(transactionsArray[id])
    : response.redirect("/transactions");
});

// Post/New item request
budgeter.post("/", (request, response) => {
  console.log("Post request");
  transactionsArray.push(request.body);
  response.status(201).json(
    transactionsArray.sort((a, b) => {
      return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
    })
  );
});

// Delete request
budgeter.delete("/:id", (request, response) => {
  let { id } = request.params;
  console.log(`Delete request for id: ${id}`);
  transactionsArray[id]
    ? response.status(200).json(transactionsArray.splice(id, 1)[0])
    : response.status(404).json({ error: "id not found" });
});

// Put/update request
budgeter.put("/:id", (request, response) => {
  let { id } = request.params;
  console.log(`Put request for id: ${id}`);
  if (transactionsArray[id]) {
    transactionsArray[id] = request.body;
    response.status(200).json(
      transactionsArray.sort((a, b) => {
        return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
      })
    );
  } else {
    response.status(404).json({ error: "index not found" });
  }
  // } else {
  //   response.status(400).json({ error: "Invalid data type entered" });
  // }
});
module.exports = budgeter;
