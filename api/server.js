const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const server = express();

server.use(express.json());
server.use(cors());

mongoose
  .connect(
    process.env.MLAB,
    { useNewUrlParser: true }
  )
  .then(() => console.log("\n... API Connected to Database ...\n"))
  .catch(err => console.log("\n*** ERROR Connecting to Database ***\n", err));

server.get("/", (req, res) => {
  res.json({ Message: "Hello World" });
});

const port = process.env.PORT || 3333;

server.listen(port, err => {
  if (err) console.log(err);
  else {
    console.log(`Server started on port ${port}`);
  }
});

const UserRoutes = require("./users/UserRoutes.js");
server.use("/users", UserRoutes);
