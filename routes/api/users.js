const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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

module.exports = router;
