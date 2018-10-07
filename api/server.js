const express = require("express");
const cors = require("cors");

const server = express();

server.use(express.json());
server.use(cors());

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
