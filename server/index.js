const app = require("express")();
require("dotenv").config();

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(process.env.PORT, () => {
  console.log("My server is Running");
});
