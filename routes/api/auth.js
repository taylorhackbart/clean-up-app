const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware");
const User = require("../../models/users");


//Create a new user
router.post("/register", async (req, res) => {
  try {
    let {
      username,
      password,
      passwordCheck,
      displayName,
      email
    } = req.body;

    // validate

    if (!username || !password || !passwordCheck)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 5 characters long." });
    if (password !== passwordCheck)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });
//Checks to see if username exists in DB already
    const existingUser = await User.findOne({ 
      where: {username: username}
    });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this username already exists." });

    if (!displayName) displayName = username;

    //storing the password in the database using encryption
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = User.create({
      username,
      password: passwordHash,
      displayName,
      email
    });
    // const savedUser = await newUser.save();
    // savedUser.create(newUser);
    res.json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});
//Allows user to User
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // validate
    if (!username || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const user = await User.findOne({where : { username: username }});
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this username has been registered." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user.id,
        displayName: user.displayName,
        username: user.username
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err)
  }
});

router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = await User.findByPkAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//Must have valid token to User (JWT_SECRET)
router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");

    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const id = verified.id
    const user = await User.findByPk(id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  const token = req.header("x-auth-token");
  if (!token) return res.json(false);

  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (!verified) return res.json(false);

  const user = await User.findByPk(verified.id);
  if (!user) return res.json(false);

  return res.json({
    token,
    displayName: user.displayName,
    id: user.id,
    username: user.username
  });
});

//Grab all users
router.get("/register", async (req, res) => {
  const user = await User.find();
  res.json(user);
});

//Grab users by certain ID
router.get("/register/:id", async (req, res) => {
  User.findByPk(req.params.id)
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

//Update user if necessary
router.put("/register/:id", async (req, res) => {
  User.findOneAndUpdate({ id: req.params.id }, 
    // {$set: {
    //   cleaning: req.body.cleaning
    // }}
    )
  .then(dbModel => res.json(dbModel))
  .catch(err => res.status(422).json(err));
});
module.exports = router;
