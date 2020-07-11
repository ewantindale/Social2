const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

// User Model
const User = require("../../models/User");

// POST /api/auth
// PUBLIC
// Login a user if it exists, otherwise create a new user. Returns authentication token + user object
// Response status code is 200 when logging in, 201 if a new user is created.
// TODO: Refactor this.
router.post("/", (req, res) => {
  const { name, password } = req.body;

  // Simple validation
  if (!name || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing user
  User.findOne({ name }).then((user) => {
    if (!user) {
      // User not found, create a new user
      const newUser = new User({ name, password });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then((user) => {
            jwt.sign(
              { id: user.id, name: user.name },
              process.env.jwtSecret,
              { expiresIn: 3600 },
              (err, token) => {
                if (err) throw err;
                return res.status(201).json({
                  token,
                  user: {
                    id: user.id,
                    name: user.name,
                    notifications: user.notifications,
                  },
                });
              }
            );
          });
        });
      });
    } else {
      // User found, validate password
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch)
          return res.status(400).json({ msg: "Invalid credentials" });

        jwt.sign(
          { id: user.id, name: user.name },
          process.env.jwtSecret,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            return res.status(200).json({
              token,
              user: {
                id: user.id,
                name: user.name,
                notifications: user.notifications,
              },
            });
          }
        );
      });
    }
  });
});

// GET /api/auth/user
// Private
// Return the user's data
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
});

module.exports = router;
