const router = require('express').Router();
const User = require("../../models/users");

router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll()
    res.status(200).json(userData);
  } catch {
    res.status(500).json(err)
  }
})

module.exports = router