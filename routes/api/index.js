const router = require('express').Router();
const auth = require("./auth");

router.use("/user", auth);

module.exports = router