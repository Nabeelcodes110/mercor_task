const app = require("express")();
require("dotenv").config();
const { admin } = require("./utils/config");
const cors = require("cors");

app.use(cors());

app.use("/api/users", require("./Routes/User.controller"));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(process.env.PORT, () => {
  console.log("My server is Running");
});
