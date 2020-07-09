const express = require("express");
const router = express.Router();
const User = require("../../models/User");

// GET /api/users
// PUBLIC
// Returns a list of all users
router.get("/", (req, res) => {
  User.find()
    .select("-password")
    .then((users) => {
      res.json(users);
    })
    .catch((error) => res.status(500).json({ error }));
});

// GET /api/users/:id
// PUBLIC
// Returns a single user by id
router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .select("-password")
    .then((user) => {
      if (!user) return res.status(404).json({ error: "User does not exist" });
      res.json(user);
    })
    .catch((error) => res.status(500).json({ error }));
});

// POST /api/users
// PUBLIC
// Creates a new user
router.post("/", (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  User.findOne({ name }).then((user) => {
    if (user) {
      return res.status(400).json({ message: "The user already exists" });
    }

    const newUser = new User({ name, password });

    // TODO: Hash password and attach signed JWT to response

    newUser
      .save()
      .then((user) => {
        res.json(user);
      })
      .catch((error) => res.status(500).json({ error }));
  });
});
module.exports = router;
