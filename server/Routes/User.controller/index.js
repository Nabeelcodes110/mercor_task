const Router = require("express").Router();
const { admin } = require("../../utils/adminConfig");

Router.get("/", async (req, res) => {
  admin
    .auth()
    .listUsers()
    .then((data) => {
      res.json({ success: true, payload: data });
    })
    .catch((err) => {
      res.json({ success: false, errors: err });
    });
});

module.exports = Router;
