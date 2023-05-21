const app = require("express")();
require("dotenv").config();
const functions = require("firebase-functions");
const cors = require("cors");

app.use(cors());

app.use("/api/users", require("./Routes/User.controller"));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(process.env.PORT, () => {
  console.log("My server is Running");
});

exports.api = functions.https.onRequest(app);
